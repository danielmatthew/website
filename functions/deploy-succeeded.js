import Twitter from 'twitter';

const FEED = 'https://danmatthew.co.uk/feed.xml';

const twitter = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER.ACCESS_TOKEN_SECRET,
});

const handleError = (err) => {
  return {
    statusCode: 422,
    body: String(msg),
  };
};

exports.handler = async () => {
  return fetch(FEED)
    .then((response) => response.json())
    .then(processNotes)
    .catch(handleError);
};
