declare module "bun" {
	interface Env {
		RPC_PROVIDER_API_KEY: string;

		TWITTER_CONSUMER_KEY: string;
		TWITTER_CONSUMER_SECRET: string;
		TWITTER_ACCESS_TOKEN: string;
		TWITTER_TOKEN_SECRET: string;
	}
}

export const RPC_PROVIDER_API_KEY = process.env.RPC_PROVIDER_API_KEY;

export const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
export const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET;
export const TWITTER_ACCESS_TOKEN = process.env.TWITTER_ACCESS_TOKEN;
export const TWITTER_TOKEN_SECRET = process.env.TWITTER_TOKEN_SECRET;

export const NODE_ENV = process.env.NODE_ENV;
