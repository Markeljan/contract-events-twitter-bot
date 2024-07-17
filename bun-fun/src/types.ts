import type { Hash, Hex, Log } from "viem";
import type { arbitrum, zkSync } from "viem/chains";

export type CourseName = "foundry" | "security" | "foundry-zk" | "security-zk";

export type ChainId = typeof arbitrum.id | typeof zkSync.id;

export type TweetData = {
  twitterHandle: string;
  tokenId: number;
  lessonId: string;
  courseName: CourseName;
  chainId: ChainId;
};

type ChallengeEventLogArgs = {
  solver: Hex;
  challenge: Hex;
  twitterHandle: string;
};

export type ChallengeEventLog = {
  args: ChallengeEventLogArgs;
  eventName: "ChallengeSolved";
  transactionHash: Hash;
} & Log;

export type TransferEventLog = {
  eventName: "Transfer";
  args: {
    from: Hex;
    to: Hex;
    tokenId: Hex;
  };
};
