# Contract Events Twitter Bot

The Contract Events Twitter Bot is composed of a backend service and a frontend application. The backend listens for `ChallengeSolved` events on the Arbitrum network and tweets from a specified Twitter account when an event is detected. The frontend visualizes these events in a user-friendly format.

## Backend

The backend service is implemented in Node.js. 

### Installation and Setup

1. Navigate to the backend service directory: `cd backend-nodejs`
2. Install the dependencies with `yarn install`
3. Setup a `.env` file with your Twitter API credentials and Alchemy API key.

### Running the Bot
- `yarn build` - Compiles the TypeScript code to JavaScript.
- `yarn start` - Starts the bot.

## Frontend

The frontend service is a React application. 

### Installation and Setup

1. Navigate to the frontend service directory: `cd frontend-react`
2. Install the dependencies with `yarn install`
3. Setup a `.env` file with your Alchemy API key.

### Running the App
- `yarn dev` - Runs the app in development mode.

## Dependencies

- Backend: `axios`, `dotenv`, `node-fetch`, `oauth-1.0a`, `twitter-api-v2`, `viem`, TypeScript.
- Frontend: `react`, `react-dom`, `react-dom-confetti`, `viem`, TypeScript.

Remember to replace `your_rpc_provider_api_key`, `your_twitter_consumer_key`, `your_twitter_consumer_secret`, `your_twitter_access_token`, and `your_twitter_token_secret` with your actual keys in the `.env` files.

```