import { arbitrum, zksync } from "viem/chains";

import { webSocketClientArbitrum, webSocketClientZkSync } from "@/clients";
import { NODE_ENV } from "@/config";
import { FOUNDRY_COURSE_CONFIG, SECURITY_COURSE_CONFIG } from "@/constants.ts";
import { handleChallengeSolvedEvent } from "@/handleChallengeSolved.ts";
import type { ChallengeEventLog } from "@/types.ts";

const shouldSendTweet = NODE_ENV === "production";

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
    console.log(e.message);
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

const unwatchSecurityContractZkSync = webSocketClientZkSync.watchContractEvent({
  address: SECURITY_COURSE_CONFIG.address[zksync.id],
  abi: SECURITY_COURSE_CONFIG.abi,
  eventName: "ChallengeSolved",
  onError: (e) => {
    console.log(e.message);
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
        chainId: zksync.id,
        shouldSendTweet,
      });
    } catch (e) {
      console.log(e);
    }
  },
});

console.log("Listening for ChallengeSolved events...");
