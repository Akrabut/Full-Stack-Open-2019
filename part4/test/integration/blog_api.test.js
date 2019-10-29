const app = require('../../index');
const api = require('supertest')(app.app);
const Blog = require('../../models/blog');
const testHelper = require('../test_helper');

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = testHelper.listWithBlogs.map(blog => new Blog(blog));
  const blogs = blogObjects.map(blog => blog.save());
  await Promise.all(blogs);
});

describe('get request without an id', () => {
  test('all blogs are returned in a get request', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body.length).toBe(testHelper.listWithBlogs.length);
  });

  test('blog content is properly returned', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body.map(blog => blog.title)).toContain('Some weird title');
    expect(response.body.map(blog => blog.author)).toContain('Edsger W. Dijkstra');
  });

  test('response is in JSON format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('blogs have id attribute rather than _id', async () => {
    const blogs = (await api.get('/api/blogs')).body;
    blogs.forEach(blog => expect(blog.id).toBeDefined());
  });
});

// afterAll(() => {
//   app.mongoose.connection.close();
// });