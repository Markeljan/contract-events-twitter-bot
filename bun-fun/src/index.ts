import { arbitrum, zksync } from "viem/chains";

import { webSocketClientArbitrum, webSocketClientZkSync } from "@/clients";
import { FOUNDRY_COURSE_CONFIG, SECURITY_COURSE_CONFIG } from "@/constants.ts";
import { handleChallengeSolvedEvent } from "@/handleChallengeSolved.ts";

//////////////////////////////////////
// Begin listening for new events  //
////////////////////////////////////

const watchConfig = [
	{
		client: webSocketClientArbitrum,
		chainId: arbitrum.id,
		configs: [
			{
				courseConfig: FOUNDRY_COURSE_CONFIG,
				courseName: "foundry",
			},
			{
				courseConfig: SECURITY_COURSE_CONFIG,
				courseName: "security",
			},
		],
	},
	{
		client: webSocketClientZkSync,
		chainId: zksync.id,
		configs: [
			{
				courseConfig: FOUNDRY_COURSE_CONFIG,
				courseName: "foundry",
			},
			{
				courseConfig: SECURITY_COURSE_CONFIG,
				courseName: "security",
			},
		],
	},
] as const;

for (const { client, chainId, configs } of watchConfig) {
	for (const { courseConfig, courseName } of configs) {
		client.watchContractEvent({
			address: courseConfig.address[chainId],
			abi: courseConfig.abi,
			eventName: "ChallengeSolved",
			onError: (e) => {
				console.log(e?.message || e);
			},
			onLogs: (logs) => {
				const {
					transactionHash,
					args: { challenge, twitterHandle },
				} = logs[0];
				if (!twitterHandle || !challenge || !transactionHash) return;
				try {
					handleChallengeSolvedEvent({
						twitterHandle,
						challenge,
						transactionHash,
						courseName,
						chainId,
					});
				} catch (e) {
					console.log(e);
				}
			},
			poll: true,
		});
	}
}

console.log("Listening for ChallengeSolved events...");
