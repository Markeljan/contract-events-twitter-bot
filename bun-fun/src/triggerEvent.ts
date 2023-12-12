import { FOUNDRY_COURSE_ABI, FOUNDRY_COURSE_ADDRESS, SECURITY_COURSE_ABI, SECURITY_COURSE_ADDRESS } from "./constants";
import { ChallengeEventLog, CourseName } from "./types";
import { handleChallengeSolvedEvent, publicClient } from "./handleChallengeSolved";

/////////////////////////////////
//  Manually trigger an event  //
/////////////////////////////////

const triggerEvent = async (eventIndex: number, courseName: CourseName, shouldSendTweet: boolean = false) => {
  // Create a filter for the ChallengeSolved event
  const challengeSolvedFilter: any = await publicClient.createContractEventFilter({
    abi: courseName === "foundry" ? FOUNDRY_COURSE_ABI : SECURITY_COURSE_ABI,
    address: courseName === "foundry" ? FOUNDRY_COURSE_ADDRESS : SECURITY_COURSE_ADDRESS,
    eventName: "ChallengeSolved",
    fromBlock: 97795932n,
    strict: true,
  });
  // Get the logs for the filter
  const logs = await publicClient.getFilterLogs({ filter: challengeSolvedFilter });
  const transactionHash = logs[eventIndex].transactionHash;
  const { twitterHandle, challenge } = (logs[eventIndex] as ChallengeEventLog).args;
  console.log("Found event: ", twitterHandle, challenge, transactionHash, courseName);
  try {
    // Call handleChallengeSolvedEvent to send or simulate a tweet
    handleChallengeSolvedEvent({
      twitterHandle,
      challenge,
      transactionHash,
      courseName,
      shouldSendTweet,
    });
  } catch (e) {
    console.log(e);
  }
};

//////////////////////////////
//  CLI for manual testing  //
/////////////////////////////

// Usage: bun run triggerEvent.ts <eventIndex> <courseName> [shouldSendTweet]
const main = async () => {
  const args = process.argv.slice(2);
  if (args.length < 2 || args.length > 3) {
    console.error("Usage: bun run triggerEvent.ts <eventIndex> <courseName> [shouldSendTweet]");
    process.exit(1);
  }

  const eventIndex = parseInt(args[0], 10);
  const courseName = args[1];
  const shouldSendTweet = args.length === 3 ? args[2] === "true" : false; // Default to false if not provided

  if (isNaN(eventIndex)) {
    console.error("Invalid event index: must be a number.");
    process.exit(1);
  }

  if (courseName !== "foundry" && courseName !== "security") {
    console.error("Invalid course name: must be either 'foundry' or 'security'.");
    process.exit(1);
  }

  try {
    await triggerEvent(eventIndex, courseName, shouldSendTweet);
  } catch (error) {
    console.error("Error triggering event:", error);
    process.exit(1);
  }
};

main();

//////////////////////////////////
//  Tests with expected outputs //
/////////////////////////////////

// bun run triggerEvent.ts 605 foundry true
// Found event:  gabr1sr 0xdeB8d8eFeF7049E280Af1d5FE3a380F3BE93B648 0xa4972cea06b5fddc2f945dd24c5fcfb1072dc6a7bb369de793c0c681466b2b02 foundry
// Sending tweet: Congrats @gabr1sr for minting Lesson 6 of the Foundry course!
// You can view the NFT on Opensea here
// https://opensea.io/assets/arbitrum/0x39338138414Df90EC67dC2EE046ab78BcD4F56D9/605
// {
//   data: {
//     edit_history_tweet_ids: [ "1734694821863026716" ],
//     id: "1734694821863026716",
//     text: "Congrats @gabr1sr for minting Lesson 6 of the Foundry course!\n\nYou can view the NFT on Opensea here\nhttps://t.co/tMqBeYmPZC",
//   },
// }

// bun run triggerEvent.ts 2 security
// Found event:  ljjeth 0x89edc4c74810bedbd53d7dA677eB420DC0154B0b 0xca749e5b94e8acc75d09b6f910a29ee4ec9d56ce1d0613b215ebcc6e98f95cca security
// Simulating tweet:  Congrats @ljjeth for minting Lesson S3 of the Security course!
// You can view the NFT on Opensea here
// https://opensea.io/assets/arbitrum/0xDe0e797bfAd78F0615d75430C53F8fe3C9e49883/2
