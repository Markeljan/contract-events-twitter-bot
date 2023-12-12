import {
  Hash,
  Address,
  TransactionReceipt,
  encodeEventTopics,
  decodeEventLog,
  fromHex,
  createPublicClient,
  http,
  PublicClient,
} from "viem";
import {
  LESSON_DICTIONARY,
  FOUNDRY_COURSE_ABI,
  SECURITY_COURSE_ABI,
  FOUNDRY_COURSE_ADDRESS,
  SECURITY_COURSE_ADDRESS,
  RPC_PROVIDER_API_KEY,
} from "./constants";
import { sendTweet } from "./sendTweet";
import { CourseName, TransferEventLog, TweetData } from "./types";
import { arbitrum } from "viem/chains";

export const publicClient: PublicClient = createPublicClient({
  chain: arbitrum,
  transport: http(`https://arb-mainnet.g.alchemy.com/v2/${RPC_PROVIDER_API_KEY}`),
});

// Function to handle ChallengeSolved event
export const handleChallengeSolvedEvent = async ({
  twitterHandle,
  challenge,
  transactionHash,
  courseName,
  shouldSendTweet = false,
}: {
  twitterHandle: string;
  challenge: string;
  transactionHash: Hash;
  courseName: CourseName;
  shouldSendTweet?: boolean;
}) => {
  const sanitizedHandle = sanitizeHandle(twitterHandle);
  const lessonId = LESSON_DICTIONARY[challenge as Address];
  const tokenId = await getTokenId(transactionHash, courseName);
  if (!twitterHandle) {
    throw new Error("Invalid twitter handle: " + twitterHandle);
  }
  const tweetMessage = formatTweetMessage({ twitterHandle: sanitizedHandle, tokenId, lessonId, courseName });
  if (shouldSendTweet) {
    console.log(`Sending tweet: ${tweetMessage}`);
    sendTweet(tweetMessage);
  } else {
    console.log("Simulating tweet: ", tweetMessage);
  }
};

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
