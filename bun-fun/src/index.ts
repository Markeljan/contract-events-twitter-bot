import { createPublicClient, webSocket } from "viem";
import { arbitrum, zkSync } from "viem/chains";

import { FOUNDRY_COURSE_CONFIG, RPC_PROVIDER_API_KEY, SECURITY_COURSE_CONFIG } from "@/constants.ts";
import { handleChallengeSolvedEvent } from "@/handleChallengeSolved.ts";
import type { ChallengeEventLog } from "@/types.ts";

const shouldSendTweet = process.env.NODE_ENV === "production";

const webSocketClientArbitrum = createPublicClient({
  chain: arbitrum,
  transport: webSocket(`wss://arb-mainnet.g.alchemy.com/v2/${RPC_PROVIDER_API_KEY}`),
});

const webSocketClientZkSync = createPublicClient({
  chain: zkSync,
  transport: webSocket(`wss://zksync-mainnet.g.alchemy.com/v2/${RPC_PROVIDER_API_KEY}`),
});

//////////////////////////////////////
// Begin listening for new events  //
////////////////////////////////////
const unwatchFoundryContract = webSocketClientArbitrum.watchContractEvent({
  address: FOUNDRY_COURSE_CONFIG.address[arbitrum.id],
  abi: FOUNDRY_COURSE_CONFIG.abi,
  eventName: "ChallengeSolved",
  onError: (e) => {
    console.log(e);
  },
  onLogs: (logs) => {
    const {
      transactionHash,
      args: { challenge, twitterHandle },
    } = logs[0] as ChallengeEventLog;
    try {
      handleChallengeSolvedEvent({
        twitterHandle,
        challenge,
        transactionHash,
        courseName: "foundry",
        chainId: arbitrum.id,
        shouldSendTweet,
      });
    } catch (e) {
      console.log(e);
    }
  },
});

const unwatchSecurityContract = webSocketClientArbitrum.watchContractEvent({
  address: SECURITY_COURSE_CONFIG.address[arbitrum.id],
  abi: SECURITY_COURSE_CONFIG.abi,
  eventName: "ChallengeSolved",
  onError: (e) => {
    console.log(e);
  },
  onLogs: (logs) => {
    const {
      transactionHash,
      args: { challenge, twitterHandle },
    } = logs[0] as ChallengeEventLog;
    try {
      handleChallengeSolvedEvent({
        twitterHandle,
        challenge,
        transactionHash,
        courseName: "security",
        chainId: arbitrum.id,
        shouldSendTweet,
      });
    } catch (e) {
      console.log(e);
    }
  },
});

const unwatchFoundryContractZkSync = webSocketClientZkSync.watchContractEvent({
  address: FOUNDRY_COURSE_CONFIG.address[zkSync.id],
  abi: FOUNDRY_COURSE_CONFIG.abi,
  eventName: "ChallengeSolved",
  onError: (e) => {
    console.log(e);
  },
  onLogs: (logs) => {
    const {
      transactionHash,
      args: { challenge, twitterHandle },
    } = logs[0] as ChallengeEventLog;
    try {
      handleChallengeSolvedEvent({
        twitterHandle,
        challenge,
        transactionHash,
        courseName: "foundry",
        chainId: zkSync.id,
        shouldSendTweet,
      });
    } catch (e) {
      console.log(e);
    }
  },
});

const unwatchSecurityContractZkSync = webSocketClientZkSync.watchContractEvent({
  address: SECURITY_COURSE_CONFIG.address[zkSync.id],
  abi: SECURITY_COURSE_CONFIG.abi,
  eventName: "ChallengeSolved",
  onError: (e) => {
    console.log(e);
  },
  onLogs: (logs) => {
    const {
      transactionHash,
      args: { challenge, twitterHandle },
    } = logs[0] as ChallengeEventLog;
    try {
      handleChallengeSolvedEvent({
        twitterHandle,
        challenge,
        transactionHash,
        courseName: "security",
        chainId: zkSync.id,
        shouldSendTweet,
      });
    } catch (e) {
      console.log(e);
    }
  },
});

console.log("Listening for ChallengeSolved events...");
