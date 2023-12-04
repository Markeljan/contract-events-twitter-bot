import { Hash, Hex, Log } from "viem";

export type CourseName = "foundry" | "security";

export type TweetData = {
  twitterHandle: string;
  tokenId: number;
  lessonId: string;
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
