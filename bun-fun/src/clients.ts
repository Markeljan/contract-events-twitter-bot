import { createPublicClient, http, webSocket } from "viem";
import { arbitrum, zksync } from "viem/chains";
import { RPC_PROVIDER_API_KEY } from "@/config";

export const publicClientArbitrum = createPublicClient({
  chain: arbitrum,
  transport: http(
    `https://arb-mainnet.g.alchemy.com/v2/${RPC_PROVIDER_API_KEY}`
  ),
});
export const webSocketClientArbitrum = createPublicClient({
  chain: arbitrum,
  transport: webSocket(
    `wss://arb-mainnet.g.alchemy.com/v2/${RPC_PROVIDER_API_KEY}`,
    {
      keepAlive: true,
      reconnect: true,
      retryDelay: 1000,
    }
  ),
});

export const publicClientZkSync = createPublicClient({
  chain: zksync,
  transport: http(
    `https://zksync-mainnet.g.alchemy.com/v2/${RPC_PROVIDER_API_KEY}`
  ),
});
export const webSocketClientZkSync = createPublicClient({
  chain: zksync,
  transport: webSocket(
    `wss://zksync-mainnet.g.alchemy.com/v2/${RPC_PROVIDER_API_KEY}`,
    {
      keepAlive: true,
      reconnect: true,
      retryDelay: 1000,
    }
  ),
});
