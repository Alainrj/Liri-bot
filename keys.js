var env = require('dotenv').config();

console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.omdb = {
  _api_key: process.env.OMDB_API_KEY,
  get api_key() {
    return this._api_key;
  },
  set api_key(value) {
    this._api_key = value;
  },
};
