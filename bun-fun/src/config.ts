import { createPublicClient, http } from "viem";
import { arbitrum, zkSync } from "viem/chains";
import { RPC_PROVIDER_API_KEY } from "./constants";

export const publicClientArbitrum = createPublicClient({
  chain: arbitrum,
  transport: http(`https://arb-mainnet.g.alchemy.com/v2/${RPC_PROVIDER_API_KEY}`),
});

export const publicClientZkSync = createPublicClient({
  chain: zkSync,
  transport: http(`https://zksync-mainnet.g.alchemy.com/v2/${RPC_PROVIDER_API_KEY}`),
});
