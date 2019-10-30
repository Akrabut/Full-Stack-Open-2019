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

describe('post request for a new blog', () => {
  const newBlog = {
    title: 'a test blog',
    author: 'a tester',
    url: 'www.qa.co.il',
    likes: 512,
  };
  const blog = new Blog(newBlog);

  test('a post request with a new blog succeeds', async () => {
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/);
  });

  test('a post request adds a new blog to the database', async () => {
    const initialDB = (await api.get('/api/blogs')).body;
    await api.post('/api/blogs').send(blog);
    expect((await api.get('/api/blogs')).body.length).toBe(initialDB.length + 1);
  });

  test('a post request adds the correct content to the database', async () => {
    await api.post('/api/blogs').send(blog);
    expect((await api.get('/api/blogs')).body.map(blog => blog.author)).toContain('a tester');
  });

  test('a blog created without the likes attribute has its attribute created and set to zero', async () => {
    const noLikes = {
      title: 'a likeless blog',
      author: 'a hater',
      url: 'www.nolikes.wow',
    };
    await api.post('/api/blogs').send(new Blog(noLikes));
    expect((await api.get('/api/blogs')).body.map(blog => blog.likes)).toContain(0);
  });

  test('a blog without a url or a title is not saved and a 400 status code is return', async () => {
    const badBlog = {
      author: 'an illegal author',
      likes: 0,
    };
    await api
      .post('/api/blogs')
      .send(new Blog(badBlog))
      .expect(400);
  });
});

// afterAll(() => {
//   app.mongoose.connection.close();
// });