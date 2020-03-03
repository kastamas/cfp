const axios = require("axios");
const CLI = require('clui');
const Spinner = CLI.Spinner;

module.exports = {
  getToken: async (data) => {
    const status = new Spinner('Authenticating you, please wait...');
    const url = `https://api.supermetrics.com/assignment/register`;
    status.start();

    try {
      const body = {
        client_id: "ju16a6m81mhid5ue1z3v2g0uh",
        email: "mikxsid@gmail.com",
        name: "Mike Sidorov"
      };

      const response = await axios.post(url, body);
      const sl_token = await response.data.data.sl_token;

      status.stop();

      return sl_token;
    } catch (e) {
      console.log("token request");
      handleError(e, status);
    }
  },
  getPosts: async (sl_token) => {
    const status = new Spinner('Requesting posts, please wait...');
    const url = 'https://api.supermetrics.com/assignment/posts';
    status.start();

    try {
      const response = await axios.get(url, {params: {sl_token}});
      const posts = await response.data.data.posts;

      status.stop();

      return posts;
    } catch (e) {
      console.log("posts request");
      handleError(e, status);
    }
  }
};

function handleError(e, status) {
  console.log("Error happened:", e.message);
  status.stop()
}
