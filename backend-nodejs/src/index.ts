import dotenv from 'dotenv';
import {
  GetFilterLogsReturnType,
  Log,
  TransactionReceipt,
  createPublicClient,
  decodeEventLog,
  encodeEventTopics,
  fromHex,
  http,
  webSocket
} from 'viem';
import { arbitrum } from 'viem/chains';
import {
  FOUNDRY_COURSE_CONTRACT_ADDRESS,
  FOUNDRY_COURSE_CONTRACT_ABI,
  LESSON_DICTIONARY
} from './contractData.js';
import { sendTweet } from './sendTweet.js';

dotenv.config();

const RPC_PROVIDER_API_KEY = process.env.RPC_PROVIDER_API_KEY || '';

const webSocketClient = createPublicClient({
  chain: arbitrum,
  transport: webSocket(`wss://arb-mainnet.g.alchemy.com/v2/${RPC_PROVIDER_API_KEY}`)
});

const publicClient = createPublicClient({
  chain: arbitrum,
  transport: http(`https://arb-mainnet.g.alchemy.com/v2/${RPC_PROVIDER_API_KEY}`)
});

type ExpectedLogArgs = {
    solver: `0x${string}`;
    challenge: `0x${string}`;
    twitterHandle: string;
  }

type ExpectedLog = {
  args: ExpectedLogArgs;
  eventName: string;
  transactionHash: `0x${string}`;
} & Log

// Helper function to sanitize twitter handle
const sanitizeHandle = (twitterHandleInput: string): string => {
  let handle = twitterHandleInput.replace(/\s/g, '');
  if (handle.startsWith('https://twitter.com/')) handle = handle.replace('https://twitter.com/', '');
  else if (handle.startsWith('twitter.com/')) handle = handle.replace('twitter.com/', '');
  if (!handle.startsWith('@')) handle = '@' + handle;
  if (!/^@[a-zA-Z0-9_]{1,15}$/.test(handle)) handle = '';
  return handle;
}

// Function to handle ChallengeSolved event
const handleChallengeSolvedEvent = async (twitterHandleInput: string, challenge: `0x${string}`, transactionHash: `0x${string}`) => {
  const handle = sanitizeHandle(twitterHandleInput);
  const lessonId = LESSON_DICTIONARY[challenge.toLowerCase()];
  const tokenId = await getTokenId(transactionHash);
  if (!handle) {
    console.log(`Invalid twitter handle ${twitterHandleInput} for transaction hash ${transactionHash}`);
    return;
  }
  console.log(`Sending tweet for ${handle} with tokenId ${tokenId} and lessonId ${lessonId}`);
  sendTweet(handle, tokenId, lessonId);
};

// Function to get token id
const getTokenId = async (transactionHash: `0x${string}`): Promise<number> => {
  const transactionReceipt: TransactionReceipt = await publicClient.getTransactionReceipt({
    hash: transactionHash,
  });
  const transferTopics = encodeEventTopics({
    abi: FOUNDRY_COURSE_CONTRACT_ABI,
    eventName: 'Transfer',
    args: {
      from: '0x0000000000000000000000000000000000000000',
    }
  });

  let tokenId;
  for (let i = 0; i < transactionReceipt.logs.length; i++) {
    if (transactionReceipt.logs[i]['topics'][0] !== transferTopics[0] || transactionReceipt.logs[i]['topics'][1] !== transferTopics[1]) {
      continue;
    }

    const decodedEventLog = decodeEventLog({
      abi: FOUNDRY_COURSE_CONTRACT_ABI,
      eventName: 'Transfer',
      topics: transactionReceipt.logs[i]['topics'],
      data: transactionReceipt.logs[i].data,
    });

    tokenId = fromHex(decodedEventLog.args['tokenId'], 'number');
    break;
  }

  if (!tokenId) {
    console.log('No matching Transfer event found in the transaction receipt.');
    return;
  }

  return tokenId;
};

// Function to get challenge attribute
// const getChallengeAttribute = async (tokenId: number): Promise<string> => {
//   const tokenUri = await publicClient.readContract({
//     abi: FOUNDRY_COURSE_CONTRACT_ABI,
//     address: FOUNDRY_COURSE_CONTRACT_ADDRESS,
//     functionName: 'tokenURI',
//     args: [tokenId],
//   });

//   const parsedUri = tokenUri.toString().split("base64,")[1];
//   const jsonString = Buffer.from(parsedUri, 'base64').toString('utf-8');
//   const jsonData = JSON.parse(jsonString);
//   const challengeAttribute = jsonData?.attributes[0]?.trait_type;
//   return challengeAttribute;
// };

// Watch for contract event
const unwatch = webSocketClient.watchContractEvent({
  address: FOUNDRY_COURSE_CONTRACT_ADDRESS,
  abi: FOUNDRY_COURSE_CONTRACT_ABI,
  eventName: 'ChallengeSolved',
  onLogs: (logs: ExpectedLog[]) => {
    console.log("New Challenge Solved Event!", logs);
    const { args: { solver, challenge, twitterHandle }, eventName, transactionHash } = logs[0];
    handleChallengeSolvedEvent(twitterHandle, challenge, transactionHash);
  },
});

console.log("Listening for ChallengeSolved events...");


////////////////////////////////////////
// Trigger past event(s) for testing //
//////////////////////////////////////
// const triggerPastEvent = async (eventIndex: number) => {
//   const challengeSolvedFilter: any = await publicClient.createContractEventFilter({
//     abi: FOUNDRY_COURSE_CONTRACT_ABI,
//     address: FOUNDRY_COURSE_CONTRACT_ADDRESS,
//     eventName: 'ChallengeSolved',
//     fromBlock: 97795932n,
//     strict: true,
//   });
  
//   const logs: GetFilterLogsReturnType = await publicClient.getFilterLogs({ filter: challengeSolvedFilter });
//   const transactionHash = logs[eventIndex].transactionHash;
//   const { twitterHandle, challenge } = logs[eventIndex].args as ExpectedLogArgs;
//   console.log("Triggering past event for: ", twitterHandle, challenge, transactionHash)
//   //handleChallengeSolvedEvent(twitterHandle, challenge, transactionHash);
// }
