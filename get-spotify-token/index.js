const axios = require('axios');

exports.handler = async () => {
  const response = {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  };

  try {
    const result = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
        ).toString('base64')}`
      }
    });
    response.statusCode = 200;
    response.body = JSON.stringify(result.data);
    return response;
  } catch (error) {
    response.statusCode = error.response.status;
    response.body = JSON.stringify(error.response.data);
    return response;
  }
};
