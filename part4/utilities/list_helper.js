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

function getMax(map, maxToGet) {
  const max = {};
  max[maxToGet] = 0;
  map.forEach((val, key) => {
    if (val > max[maxToGet]) {
      max.author = key;
      max[maxToGet] = val;
    }
  });
  return max;
}

const mostBlogs = blogs => {
  const map = blogs.reduce((blogMap, blog) => {
    blogMap.has(blog.author)
      ? blogMap.set(blog.author, blogMap.get(blog.author) + 1)
      : blogMap.set(blog.author, 1);
    return blogMap;
  }, new Map());
  return getMax(map, 'blogs');
};

const mostLikes = blogs => {
  const map = blogs.reduce((blogMap, blog) => {
    blogMap.has(blog.author)
      ? blogMap.set(blog.author, blogMap.get(blog.author) + blog.likes)
      : blogMap.set(blog.author, blog.likes);
    return blogMap;
  }, new Map());
  return getMax(map, 'likes');
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};