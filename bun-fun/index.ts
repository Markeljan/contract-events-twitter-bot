import {
  Address,
  Hash,
  Hex,
  Log,
  TransactionReceipt,
  createPublicClient,
  decodeEventLog,
  encodeEventTopics,
  fromHex,
  http,
  webSocket,
} from "viem";
import { arbitrum } from "viem/chains";
import { sendTweet } from "./sendTweet.ts";
import { ChallengeEventLog, CourseName, TransferEventLog, TweetData } from "./types.ts";
import {
  LESSON_DICTIONARY,
  FOUNDRY_COURSE_ADDRESS,
  FOUNDRY_COURSE_ABI,
  SECURITY_COURSE_ADDRESS,
  SECURITY_COURSE_ABI,
} from "./contractData.ts";

const RPC_PROVIDER_API_KEY = `${process.env.RPC_PROVIDER_API_KEY}`;

const webSocketClient = createPublicClient({
  chain: arbitrum,
  transport: webSocket(`wss://arb-mainnet.g.alchemy.com/v2/${RPC_PROVIDER_API_KEY}`),
});

const publicClient = createPublicClient({
  chain: arbitrum,
  transport: http(`https://arb-mainnet.g.alchemy.com/v2/${RPC_PROVIDER_API_KEY}`),
});

// Funciton to sanitize Twitter handle
const sanitizeHandle = (twitterHandleInput: string): string => {
  let handle = twitterHandleInput.replace(/\s/g, "");
  if (handle.startsWith("x.com/")) handle = handle.replace("x.com/", "");
  if (handle.startsWith("https://x.com/")) handle = handle.replace("https://x.com/", "");
  if (handle.startsWith("twitter.com/")) handle = handle.replace("twitter.com/", "");
  if (handle.startsWith("https://twitter.com/")) handle = handle.replace("https://twitter.com/", "");
  if (!handle.startsWith("@")) handle = "@" + handle;
  if (!/^@[a-zA-Z0-9_]{1,15}$/.test(handle)) throw new Error("Invalid twitter handle: " + handle);
  return handle;
};

// Function to handle ChallengeSolved event
const handleChallengeSolvedEvent = async ({
  twitterHandle,
  challenge,
  transactionHash,
  courseName,
}: {
  twitterHandle: string;
  challenge: string;
  transactionHash: Hash;
  courseName: CourseName;
}) => {
  const sanitizedHandle = sanitizeHandle(twitterHandle);
  const lessonId = LESSON_DICTIONARY[challenge as Address];
  const tokenId = await getTokenId(transactionHash, courseName);
  if (!twitterHandle) {
    throw new Error("Invalid twitter handle: " + twitterHandle);
  }
  const tweetMessage = formatTweetMessage({ twitterHandle: sanitizedHandle, tokenId, lessonId, courseName });
  console.log(`Sending tweet: ${tweetMessage}`);
  sendTweet(tweetMessage);
};

// Function to get tokenId from transactionHash
const getTokenId = async (transactionHash: Hash, courseName: CourseName): Promise<number> => {
  const transactionReceipt: TransactionReceipt = await publicClient.getTransactionReceipt({
    hash: transactionHash,
  });
  const transferTopics = encodeEventTopics({
    abi: courseName === "foundry" ? FOUNDRY_COURSE_ABI : SECURITY_COURSE_ABI,
    eventName: "Transfer",
    args: {
      from: "0x0000000000000000000000000000000000000000",
    },
  });

  for (let i = 0; i < transactionReceipt.logs.length; i++) {
    if (
      transactionReceipt.logs[i]["topics"][0] !== transferTopics[0] ||
      transactionReceipt.logs[i]["topics"][1] !== transferTopics[1]
    ) {
      continue;
    }

    const decodedEventLog = decodeEventLog({
      abi: courseName === "foundry" ? FOUNDRY_COURSE_ABI : SECURITY_COURSE_ABI,
      eventName: "Transfer",
      topics: transactionReceipt.logs[i]["topics"],
      data: transactionReceipt.logs[i].data,
    }) as TransferEventLog;

    const tokenId = fromHex(decodedEventLog.args["tokenId"], "number");
    return tokenId;
  }

  throw new Error("Could not get tokenId in event logs for transaction " + transactionHash);
};

function formatTweetMessage({ twitterHandle, tokenId, lessonId, courseName }: TweetData & { courseName: CourseName }) {
  const contractAddress = courseName === "foundry" ? FOUNDRY_COURSE_ADDRESS : SECURITY_COURSE_ADDRESS;
  const openseaUrl = `https://opensea.io/assets/arbitrum/${contractAddress}/${tokenId}`;
  const courseNameCapitalized = courseName.charAt(0).toUpperCase() + courseName.slice(1);
  const message = `Congrats ${twitterHandle} for minting Lesson ${lessonId} of the ${courseNameCapitalized} course!\n\nYou can view the NFT on Opensea here\n${openseaUrl}`;
  return message;
}

//////////////////////////////////////
//  Begin listening for new events  //
//////////////////////////////////////
const unwatch = webSocketClient.watchContractEvent({
  address: [FOUNDRY_COURSE_ADDRESS, SECURITY_COURSE_ADDRESS],
  abi: [FOUNDRY_COURSE_ABI, SECURITY_COURSE_ABI],
  eventName: "ChallengeSolved",
  onLogs: (logs) => {
    const {
      address,
      transactionHash,
      args: { challenge, twitterHandle },
    } = logs[0] as ChallengeEventLog;
    const courseName = address === FOUNDRY_COURSE_ADDRESS ? "foundry" : "security";
    try {
      handleChallengeSolvedEvent({ twitterHandle, challenge, transactionHash, courseName });
    } catch (e) {
      console.log(e);
    }
  },
});

console.log("Listening for ChallengeSolved events...");

/////////////////////////////////////
//  Manually trigger a past event  //
/////////////////////////////////////
const triggerPastEvent = async (eventIndex: number, courseName: CourseName) => {
  const challengeSolvedFilter: any = await publicClient.createContractEventFilter({
    abi: courseName === "foundry" ? FOUNDRY_COURSE_ABI : SECURITY_COURSE_ABI,
    address: courseName === "foundry" ? FOUNDRY_COURSE_ADDRESS : SECURITY_COURSE_ADDRESS,
    eventName: "ChallengeSolved",
    fromBlock: 97795932n,
    strict: true,
  });

  const logs = await publicClient.getFilterLogs({ filter: challengeSolvedFilter });
  const transactionHash = logs[eventIndex].transactionHash;
  const { twitterHandle, challenge } = (logs[eventIndex] as ChallengeEventLog).args;
  console.log("Triggering past event for: ", twitterHandle, challenge, transactionHash, courseName);
  try {
    handleChallengeSolvedEvent({
      twitterHandle,
      challenge,
      transactionHash,
      courseName,
    });
  } catch (e) {
    console.log(e);
  }
};

// Test events w/ expected outputs

// triggerPastEvent(0, "foundry");
// @PatrickAlphaC 0x2e99A4CA9c85383ccB54769adB3837437e296479 0x3f6f3c4e6346aabd9cf0baca3477a1319527fdac49e9521828e4be6d59c2ffb2
// Congrats @PatrickAlphaC for minting Lesson 1 of the Foundry course!

// You can view the NFT on Opensea here
// https://opensea.io/assets/arbitrum/0x39338138414Df90EC67dC2EE046ab78BcD4F56D9/0

// triggerPastEvent(0, "security");
// VitalikButerin 0xB855afC44095225105329a7416D55d0A780fc39d 0x60e25887ff69dfe1a231d921a69ce6300873f83e3ad7abb4351fce5bc5fd61a7
// Congrats @VitalikButerin for minting Lesson S7 of the Security course!

// You can view the NFT on Opensea here
// https://opensea.io/assets/arbitrum/0xDe0e797bfAd78F0615d75430C53F8fe3C9e49883/0
