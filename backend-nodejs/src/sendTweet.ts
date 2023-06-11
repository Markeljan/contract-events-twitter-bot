import dotenv from 'dotenv';
import { createHmac } from 'crypto';
import axios, { AxiosRequestConfig } from 'axios';
import OAuth from 'oauth-1.0a';
dotenv.config();

const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY || '';
const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET || '';
const TWITTER_ACCESS_TOKEN = process.env.TWITTER_ACCESS_TOKEN || '';
const TWITTER_TOKEN_SECRET = process.env.TWITTER_TOKEN_SECRET || '';

export async function sendTweet(twitterHandle: string) {
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
            data: { text: `🎉Congrats ${twitterHandle}🎉  You've solved the Ultimate, Learn Blockchain Development, Solidity, AI-Powered Smart Contract Course | Foundry Edition Challenge!!  Check out the course by PatrickAlphaC https://youtu.be/umepbfKp5rI` },
            headers: oauth.toHeader(oauth.authorize(request_data, { key: TWITTER_ACCESS_TOKEN, secret: TWITTER_TOKEN_SECRET })),
        } as AxiosRequestConfig);
        console.log(response.data);
    } catch (e) {
        console.log(e);
    }
}
