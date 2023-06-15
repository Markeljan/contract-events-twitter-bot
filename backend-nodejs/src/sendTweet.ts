import dotenv from 'dotenv';
import { createHmac } from 'crypto';
import axios, { AxiosRequestConfig } from 'axios';
import OAuth from 'oauth-1.0a';
dotenv.config();

const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY || '';
const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET || '';
const TWITTER_ACCESS_TOKEN = process.env.TWITTER_ACCESS_TOKEN || '';
const TWITTER_TOKEN_SECRET = process.env.TWITTER_TOKEN_SECRET || '';

let tweetQueue = [];
let isTweeting = false;

export async function sendTweet(twitterHandle: string, tokenId: number, challengeAttribute: string) {
  const tweetData = { twitterHandle, tokenId, challengeAttribute };
  tweetQueue.push(tweetData);

  if (!isTweeting) {
    isTweeting = true;
    tweetFromQueue();
  }
}

async function tweetFromQueue() {
  if (tweetQueue.length === 0) {
    isTweeting = false;
    return;
  }

  const { twitterHandle, tokenId, challengeAttribute } = tweetQueue.shift();
  const openseaUrl = `https://opensea.io/assets/arbitrum/0x39338138414df90ec67dc2ee046ab78bcd4f56d9/${tokenId}`;

  const message = `Congrats ${twitterHandle} for minting the '${challengeAttribute}' Lesson of the Foundry full course!\n\nYou can view the NFT on Opensea here\n${openseaUrl}`;

  const oauth = new OAuth({
    consumer: { key: TWITTER_CONSUMER_KEY, secret: TWITTER_CONSUMER_SECRET },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
        return createHmac('sha1', key).update(base_string).digest('base64');
    },
});

const request_data = {
    url: 'https://api.twitter.com/2/tweets',
    method: 'POST'
};

try {
    const response = await axios({
        url: request_data.url,
        method: request_data.method,
        data: { text: message },
        headers: oauth.toHeader(oauth.authorize(request_data, { key: TWITTER_ACCESS_TOKEN, secret: TWITTER_TOKEN_SECRET })),
    } as AxiosRequestConfig);
    console.log(response.data);
} catch (e) {
    console.log(e);
}
  setTimeout(tweetFromQueue, 10000);
}
