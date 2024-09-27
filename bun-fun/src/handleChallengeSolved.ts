import { type Address, type Hash, decodeEventLog, encodeEventTopics } from "viem";
import { arbitrum } from "viem/chains";

import { publicClientArbitrum, publicClientZkSync } from "@/clients";
import { FOUNDRY_COURSE_CONFIG, SECURITY_COURSE_CONFIG } from "@/constants";
import { sendTweet } from "@/sendTweet";
import type { ChainId, CourseName, TweetData } from "@/types";

// Function to handle ChallengeSolved event
export const handleChallengeSolvedEvent = async ({
  twitterHandle,
  transactionHash,
  chainId,
  courseName,
  challenge,
  shouldSendTweet = false,
}: {
  twitterHandle: string;
  challenge: Address;
  chainId: ChainId;
  transactionHash: Hash;
  courseName: CourseName;
  shouldSendTweet?: boolean;
}) => {
  const courseConfig = courseName === "foundry" ? FOUNDRY_COURSE_CONFIG : SECURITY_COURSE_CONFIG;
  const sanitizedHandle = sanitizeHandle(twitterHandle);
  const lessonId = courseConfig.lessonDictionary[chainId][challenge];
  const tokenId = await getTokenId(transactionHash, courseName, chainId);
  if (!twitterHandle) {
    throw new Error(`Invalid twitter handle: ${twitterHandle}`);
  }
  const tweetMessage = formatTweetMessage({ twitterHandle: sanitizedHandle, tokenId, lessonId, courseName, chainId });
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
  if (!handle.startsWith("@")) handle = `@${handle}`;
  if (!/^@[a-zA-Z0-9_]{1,15}$/.test(handle)) throw new Error(`Invalid twitter handle: ${handle}`);
  return handle;
};

// Function to get tokenId from transactionHash
const getTokenId = async (transactionHash: Hash, courseName: CourseName, chainId: ChainId): Promise<number> => {
  const publicClient = chainId === arbitrum.id ? publicClientArbitrum : publicClientZkSync;
  const transactionReceipt = await publicClient.getTransactionReceipt({
    hash: transactionHash,
  });
  const transferTopics = encodeEventTopics({
    abi: courseName === "foundry" ? FOUNDRY_COURSE_CONFIG.abi : SECURITY_COURSE_CONFIG.abi,
    eventName: "Transfer",
    args: {
      from: "0x0000000000000000000000000000000000000000",
    },
  });

  for (let i = 0; i < transactionReceipt.logs.length; i++) {
    if (
      transactionReceipt.logs[i].topics[0] !== transferTopics[0] ||
      transactionReceipt.logs[i].topics[1] !== transferTopics[1]
    ) {
      continue;
    }

    const decodedEventLog = decodeEventLog({
      abi: courseName === "foundry" ? FOUNDRY_COURSE_CONFIG.abi : SECURITY_COURSE_CONFIG.abi,
      eventName: "Transfer",
      topics: transactionReceipt.logs[i].topics,
      data: transactionReceipt.logs[i].data,
    });

    const tokenId = Number(decodedEventLog.args.tokenId);
    return tokenId;
  }

  throw new Error(`Could not get tokenId in event logs for transaction ${transactionHash}`);
};

function formatTweetMessage({ twitterHandle, tokenId, lessonId, courseName, chainId }: TweetData): string {
  const contractAddress =
    courseName === "foundry" ? FOUNDRY_COURSE_CONFIG.address[chainId] : SECURITY_COURSE_CONFIG.address[chainId];
  const openseaUrl =
    chainId === arbitrum.id
      ? `https://opensea.io/assets/arbitrum/${contractAddress}/${tokenId}`
      : `https://zkmarkets.com/zksync-era/collections/${contractAddress}/nfts/${tokenId}`;
  const courseNameCapitalized = courseName.charAt(0).toUpperCase() + courseName.slice(1);
  const message = `Congrats ${twitterHandle} for minting Lesson ${lessonId} of the ${courseNameCapitalized} course!\n\nYou can view the NFT here\n${openseaUrl}`;
  return message;
}
