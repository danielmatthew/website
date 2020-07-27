const fetch = require('node-fetch');
const Twitter = require('twitter');
const Entities = require('html-entities').AllHtmlEntities;

require('dotenv').config;

const FEED = 'https://danmatthew.co.uk/feed.json';

const twitter = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const handleError = (error) => {
  console.error(error);
  const msg = Array.isArray(error) ? error[0].message : error.message;

  return {
    statusCode: 422,
    body: String(msg),
  };
};

const status = (code, message) => {
  console.log(message);

  return {
    statusCode: code,
    body: message,
  };
};

const processNotes = async (notes) => {
  const postItems = notes.items;

  if (!postItems.length) {
    return status(404, 'No posts to process');
  }

  const latestNote = postItems[0];

  if (!latestNote.syndicate) {
    return status(400, 'Latest post has disabled syndication. No action taken');
  }

  try {
    const query = await twitter.get('search/tweets', { q: latestNote.url });

    if (query.statuses && query.statuses.length === 0) {
      return publishNote(latestNote);
    } else {
      return status(400, 'Latest post was already syndicated. No action taken');
    }
  } catch (error) {
    return handleError(error);
  }
};

const prepareStatusText = (note) => {
  const maxLength = 280 - 3 - 1 - 23 - 20;
  const entities = new Entities();

  let text = note.content_html.trim().replace(/<[^>]+>/g, '');
  text = entities.decode(text);

  if (text.length > maxLength) {
    text = text.substring(0, maxLength) + '…';
  }

  text += ' ' + note.url;

  if (note.link && note.link.length) {
    text += ' ' + note.link;
  }

  return text;
};

const publishNote = async (note) => {
  try {
    const statusText = prepareStatusText(note);

    const tweet = await twitter.post('statuses/update', {
      status: statusText,
    });

    if (tweet) {
      return status(
        200,
        `Post ${note.date_published} successfully posted to Twitter`
      );
    } else {
      return status(422, 'Error posting to Twitter API');
    }
  } catch (error) {
    return handleError(error);
  }
};

exports.handler = async () => {
  return fetch(FEED)
    .then((response) => response.json())
    .then(processNotes)
    .catch(handleError);
};
