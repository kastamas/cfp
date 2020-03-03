
module.exports = {
  getAveragePostLength: (posts) => {
    const reducer = ((accumulator, post) => post.message.length + accumulator);
    const averageLength = posts.reduce(reducer, 0) / posts.length;

    return averageLength;
  }
};