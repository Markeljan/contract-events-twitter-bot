# Contract Event Tracker -> Twitter Bot

A fun project developed to monitor and celebrate NFT minting on the Arbitrum network.

This project is made up of two main parts:

- **Backend Twitter Bot** - A bot that listens for contract events on the Arbitrum network and tweets congratulations to a user's Twitter handle when they mint an NFT.

- **Frontend Tracker** - A web application that listens for contract events in real-time and displays the latest mints.

The project was inspired by a [task](https://github.com/Cyfrin/foundry-full-course-f23/issues/13) proposed by PatrickAlphaC. The task was to create a Twitter bot that congratulates people when they mint an NFT on the Arbitrum network, with the addition of a website that shows a real-time list of people minting.

The contract we are listening for events from can be found [here](https://arbiscan.io/address/0x39338138414Df90EC67dC2EE046ab78BcD4F56D9#code).

## Backend Twitter Bot

The backend service is implemented in Node.js. 

### Installation and Setup

1. Navigate to the backend service directory: `cd backend-nodejs`
2. Install the dependencies with `yarn install`
3. Setup a `.env` file with your Twitter API credentials and Alchemy API key.

### Running the Bot
- `yarn build` - Compiles the TypeScript code to JavaScript.
- `yarn start` - Starts the bot.

## Frontend Tracker

The frontend service is a React application that displays the minting events in real-time.

### Installation and Setup

1. Navigate to the frontend service directory: `cd frontend-react`
2. Install the dependencies with `yarn install`
3. Setup a `.env` file with your Alchemy API key.

### Running the App
- `yarn dev` - Runs the app in development mode.

## Dependencies

- Backend: `axios`, `dotenv`, `node-fetch`, `oauth-1.0a`, `viem`, TypeScript.
- Frontend: `react`, `react-dom`, `react-dom-confetti`, `viem`, TypeScript.

Remember to replace `your_rpc_provider_api_key`, `your_twitter_consumer_key`, `your_twitter_consumer_secret`, `your_twitter_access_token`, and `your_twitter_token_secret` with your actual keys in the `.env` files.

## Contribute

Feel free to fork this repository, submit issues, or pull requests if you want to contribute or suggest any improvements. 

## License

[MIT]([LICENSE](https://en.wikipedia.org/wiki/MIT_License))

![Frontend Tracker](https://github.com/Cyfrin/foundry-full-course-f23/assets/12901349/84ee315a-98a7-45ec-b35f-ca16bf7b5154)

![Twitter Bot](https://github.com/Cyfrin/foundry-full-course-f23/assets/12901349/371c66be-09dd-489c-9def-e81da83a1852)

