import { createPublicClient, webSocket } from "viem";
import { arbitrum } from "viem/chains";
import { ChallengeEventLog } from "./types.ts";
import {
  FOUNDRY_COURSE_ADDRESS,
  FOUNDRY_COURSE_ABI,
  SECURITY_COURSE_ADDRESS,
  SECURITY_COURSE_ABI,
  RPC_PROVIDER_API_KEY,
} from "./constants.ts";
import { handleChallengeSolvedEvent } from "./handleChallengeSolved.ts";

const webSocketClient = createPublicClient({
  chain: arbitrum,
  transport: webSocket(`wss://arb-mainnet.g.alchemy.com/v2/${RPC_PROVIDER_API_KEY}`),
});

//////////////////////////////////////
// Begin listening for new events  //
////////////////////////////////////
const unwatchFoundryContract = webSocketClient.watchContractEvent({
  address: FOUNDRY_COURSE_ADDRESS,
  abi: FOUNDRY_COURSE_ABI,
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
        shouldSendTweet: true,
      });
    } catch (e) {
      console.log(e);
    }
  },
});

const unwatchSecurityContract = webSocketClient.watchContractEvent({
  address: SECURITY_COURSE_ADDRESS,
  abi: SECURITY_COURSE_ABI,
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
        shouldSendTweet: true,
      });
    } catch (e) {
      console.log(e);
    }
  },
});

console.log("Listening for ChallengeSolved events...");
