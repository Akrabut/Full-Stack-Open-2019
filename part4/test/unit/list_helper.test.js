const listHelper = require('../../utilities/list_helper');
const testHelper = require('../test_helper');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  const listWithOneBlog = testHelper.listWithOneBlog;

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
});

describe('highest amount of likes', () => {
  const listWithBlogs = testHelper.listWithBlogs;

  test('blog with highest amount of likes', () => {
    const result = listHelper.favoriteBlog(listWithBlogs);
    expect(result).toEqual({
      title: 'Some weird title',
      author: 'Some weird guy',
      url: 'https://www.heythatsanotherurl.net',
      likes: 39,
    });
  });

  test('author with highest amount of blogs', () => {
    const result = listHelper.mostBlogs(listWithBlogs);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 2,
    });
  });

  test('author with amount of likes', () => {
    const result = listHelper.mostLikes(listWithBlogs);
    expect(result).toEqual({
      author: 'Some weird guy',
      likes: 39,
    });
  });
});


