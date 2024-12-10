const { groupBy, maxBy } = require("lodash");
const _ = require("lodash");
groupBy;
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  reducer = (sum, item) => {
    return sum + item;
  };
  return blogs.map((b) => b.likes).reduce(reducer, 0);
};
const favoriteBlog = (blogs) => {
  return blogs.reduce((mostLiked, current) => {
    if (!mostLiked.likes || current.likes > mostLiked.likes) {
      return {
        title: current.title,
        author: current.author,
        likes: current.likes,
      };
    }
    return mostLiked;
  }, {});
};

const mostBlogs = (blogs) => {
  const array = Object.entries(blogs).map(([i, b]) => b);
  const counts = _.countBy(array, "author");
  const countsArray = Object.entries(counts).map(([i, a]) => {
    return {
      author: i,
      blogs: a,
    };
  });
  return _.maxBy(countsArray, "blogs");
};
const blogs = [
  { title: "Post 1", author: "Author 1", likes: 10 },
  { title: "Post 2", author: "Author 2", likes: 50 },
  { title: "Post 3", author: "Author 1", likes: 20 },
  { title: "Post 4", author: "Author 1", likes: 20 },
  { title: "Post 5", author: "Author 3", likes: 5 },
];
const mostLikes = (blogs) => {
  const test = blogs.reduce((acc, blog) => {
    acc[blog.author] = acc[blog.author]
      ? acc[blog.author] + blog.likes
      : blog.likes;
    return acc;
  }, {});

  const formatted = Object.entries(test).map(([a, l]) => {
    return {
      author: a,
      likes: l,
    };
  });
  return _.maxBy(formatted, "likes");
};
mostLikes(blogs);
module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
