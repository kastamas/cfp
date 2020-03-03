const moment = require('moment');
const _ = require('lodash');

module.exports = {
  getAveragePostLengthPerMonth: (posts) => {

    const groupedPosts = groupPostsByMonth(posts);

    const mapPosts = ([month, posts]) => ({month, averagePostsLength: getAveragePostsLength(posts)});

    return Object.entries(groupedPosts).map(mapPosts);
  },

  getLongestPostsPerMonth: (posts) => {
    const groupedPosts = groupPostsByMonth(posts);

    const mapPosts = ([month, posts]) => {
      const { id, message } = getLongestPost(posts);

      return { month, postId: id, length:  message.length};
    };


    return Object.entries(groupedPosts).map(mapPosts);
  },

  getAverageNumberOfPostsPerUserPerMonth: (posts) => {
    const groupedPostsByMonth = groupPostsByMonth(posts);

    const mapPosts = (([month, posts] ) => {
      const averageNumberOfPostsPerUsers = getAverageNumberOfPostsPerUsers(posts);

      return { month, averageNumberOfPostsPerUsers }
    });

    return Object.entries(groupedPostsByMonth).map(mapPosts);
  }
};

const groupPostsByMonth = (posts) => {
  const groupedPosts = _.groupBy(posts, (post) => {
    const {created_time} = post;

    return moment(created_time).format('MMMM');
  });

  return groupedPosts
};

const getLongestPost = (posts) => {
  let longestPost = posts[0];

  posts.forEach(post => {
    if (post.message.length > longestPost.message.length) {
      longestPost = post;
    }
  });

  return longestPost;
};

const getAveragePostsLength = (posts) => {
  const reducer = ((accumulator, post) => post.message.length + accumulator);
  const averageLength = posts.reduce(reducer, 0) / posts.length;

  return `~${Math.round(averageLength)} chars.`;
};

const getAverageNumberOfPostsPerUsers = (posts) => {
  const numberOfUsers = _.uniq(_.map(posts, "from_id")).length;

  if (posts.length === 0 || numberOfUsers === 0) {
    return 0;
  }

  const averagePostsPerUser = posts.length / numberOfUsers;

  return `~${Math.round(averagePostsPerUser)}`;
};

