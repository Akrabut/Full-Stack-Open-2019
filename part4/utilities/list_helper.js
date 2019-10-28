const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  return blogs.reduce((likes, blog) => {
    return likes + blog.likes;
  }, 0);
};

const favoriteBlog = blogs => {
  if (blogs.length === 0) return null;
  return blogs.slice(1, blogs.length).reduce((maxLikes, blog) => {
    if (blog.likes > maxLikes.likes) maxLikes = blog;
    return maxLikes;
  }, blogs[0]);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};