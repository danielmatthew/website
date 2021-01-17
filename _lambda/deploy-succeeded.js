const fetch = require('node-fetch');

const { URL } = process.env;

const POSTS = `${URL}/.netlify/functions/publish-posts`;
const NOTES = `${URL}/.netlify/functions/publish-notes`;

exports.handler = async (event, context) =>
  // const triggerPosts = await fetch(POSTS);
  // const triggerNotes = await fetch(NOTES);

   ({
    statusCode: 200,
    body: JSON.stringify({
      data: context,
    }),
  })
;
