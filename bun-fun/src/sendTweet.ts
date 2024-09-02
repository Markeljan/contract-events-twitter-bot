const { createHmac } = await import("node:crypto");
import OAuth from "oauth-1.0a";

const TWITTER_CONSUMER_KEY = `${process.env.TWITTER_CONSUMER_KEY}`;
const TWITTER_CONSUMER_SECRET = `${process.env.TWITTER_CONSUMER_SECRET}`;
const TWITTER_ACCESS_TOKEN = `${process.env.TWITTER_ACCESS_TOKEN}`;
const TWITTER_TOKEN_SECRET = `${process.env.TWITTER_TOKEN_SECRET}`;

const tweetQueue: string[] = [];

export async function sendTweet(message: string) {
  tweetQueue.push(message);

  // if the tweet queue is 1 we know that we need to start the tweet loop
  if (tweetQueue.length === 1) {
    tweetFromQueue();
  }
}

async function tweetFromQueue() {
  const nextTweet = tweetQueue.shift();
  if (!nextTweet) return;

  const oauth = new OAuth({
    consumer: { key: TWITTER_CONSUMER_KEY, secret: TWITTER_CONSUMER_SECRET },
    signature_method: "HMAC-SHA1",
    hash_function(base_string, key) {
      return createHmac("sha1", key).update(base_string).digest("base64");
    },
  });

  const request_data = {
    url: "https://api.twitter.com/2/tweets",
    method: "POST",
  };

  try {
    const response = await fetch(request_data.url, {
      method: request_data.method,
      body: JSON.stringify({ text: nextTweet }),
      headers: {
        "Content-Type": "application/json",
        ...oauth.toHeader(oauth.authorize(request_data, { key: TWITTER_ACCESS_TOKEN, secret: TWITTER_TOKEN_SECRET })),
      },
    });
    const body = await response.json();
    console.log(body);
  } catch (e) {
    console.log(e);
  }

  setTimeout(tweetFromQueue, 10000);
}
