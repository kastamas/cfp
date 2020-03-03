const axios = require("axios");
const CLI = require("clui");
const Spinner = CLI.Spinner;

module.exports = {
  getToken: async data => {
    const status = new Spinner("Authenticating you, please wait...");
    const url = `https://api.supermetrics.com/assignment/register`;
    status.start();

    try {
      const response = await axios.post(url, data);
      const sl_token = await response.data.data.sl_token;

      status.stop();

      return sl_token;
    } catch (e) {
      handleError(e, status, "token request");
    }
  },
  getPosts: async sl_token => {
    const status = new Spinner("Requesting posts, please wait...");
    const url = "https://api.supermetrics.com/assignment/posts";
    status.start();

    try {
      const response = await axios.get(url, { params: { sl_token } });
      const posts = await response.data.data.posts;

      status.stop();

      return posts;
    } catch (e) {
      handleError(e, status, "posts request");
    }
  }
};

function handleError(e, status, request) {
  console.log(`\nUh oh... Error happened: ${e.message}`);
  console.log(`At the ${request}`);
  status.stop();
}
