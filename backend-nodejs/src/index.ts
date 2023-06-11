import dotenv from 'dotenv';
import { Log, createPublicClient, webSocket } from 'viem';
import { arbitrum } from 'viem/chains';
import { FOUNDRY_COURSE_CONTRACT_ADDRESS, FOUNDRY_COURSE_CONTRACT_ABI } from './constants.js';
import { sendTweet } from './sendTweet.js';
dotenv.config();

type ExpectedLog = {
  args: {
    solver: any;
    challenge: any;
    twitterHandle: string;
  };
  eventName: string;
  transactionHash: any;
} & Log;

const RPC_PROVIDER_API_KEY = process.env.RPC_PROVIDER_API_KEY || '';

const handleChallengeSolved = async (twitterHandle: string) => {
  // if twitter handle doesn't have an @ at the beginning, add it
  if (!twitterHandle.startsWith('@')) {
    twitterHandle = '@' + twitterHandle;
  }
  // Check if handle is a valid format
  if (!/^@[a-zA-Z0-9_]{1,15}$/.test(twitterHandle)) {
    console.log(`Invalid Twitter handle: ${twitterHandle}`);
    return;
  }
  sendTweet(twitterHandle);
};


const webSocketClient = createPublicClient({
  chain: arbitrum,
  transport: webSocket(`wss://arb-mainnet.g.alchemy.com/v2/${RPC_PROVIDER_API_KEY}`)
});

webSocketClient.watchContractEvent({
  address: FOUNDRY_COURSE_CONTRACT_ADDRESS,
  abi: FOUNDRY_COURSE_CONTRACT_ABI,
  eventName: 'ChallengeSolved',

  onLogs: (logs: Log[]) => {
    console.log("New Challenge Solved Event!", logs);
    const { args: { solver, challenge, twitterHandle }, eventName, transactionHash } = logs[0] as ExpectedLog;
    handleChallengeSolved(twitterHandle);
  },
});

console.log("Listening for ChallengeSolved events...");