const app = require('../../index');
const api = require('supertest')(app.app);
const Blog = require('../../models/blog');
const testHelper = require('../blog_test_helper');

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = testHelper.listWithBlogs.map(blog => new Blog(blog));
  const blogs = blogObjects.map(blog => blog.save());
  await Promise.all(blogs);
});

// afterAll(async () => {
//   await app.mongoose.disconnect();
//   app.server.close();
// });

async function initialDB() {
  return (await api.get('/api/blogs')).body;
}

async function sendBlog(blog) {
  const blogToSend = new Blog(blog);
  return api.post('/api/blogs').send(blogToSend);
}

describe('get request without an id', () => {
  test('all blogs are returned in a get request', async () => {
    expect((await initialDB()).length).toBe(testHelper.listWithBlogs.length);
  });

  test('blog content is properly returned', async () => {
    expect((await initialDB()).map(blog => blog.title)).toContain('Some weird title');
    expect((await initialDB()).map(blog => blog.author)).toContain('Edsger W. Dijkstra');
  });

  test('response is in JSON format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('blogs have id attribute rather than _id', async () => {
    (await initialDB()).forEach(blog => expect(blog.id).toBeDefined());
  });
});

describe('post request for a new blog', () => {
  test('a post request with a new blog succeeds', async () => {
    await api
      .post('/api/blogs')
      .send(new Blog(testHelper.blog))
      .expect(201)
      .expect('Content-Type', /application\/json/);
  });

  test('a post request adds a new blog to the database', async () => {
    const initialLength = (await initialDB()).length;
    await sendBlog(testHelper.blog);
    expect((await initialDB()).length).toBe(initialLength + 1);
  });

  test('a post request adds the correct content to the database', async () => {
    await sendBlog(testHelper.blog);
    expect((await api.get('/api/blogs')).body.map(blog => blog.author)).toContain('a tester');
  });

  test('a blog created without the likes attribute has its attribute created and set to zero', async () => {
    const noLikes = {
      title: 'a likeless blog',
      author: 'a hater',
      url: 'www.nolikes.wow',
    };
    await sendBlog(noLikes);
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

describe('a delete request with a given ID', () => {
  test('a delete requests is responded with 204', async () => {
    await sendBlog(testHelper.blog);
    const secondDB = await initialDB();
    await api
      .delete(`/api/blogs/${secondDB[secondDB.length - 1].id}`)
      .expect(204);
  });

  test('a delete request deletes a blog', async () => {
    const firstDB = await initialDB();
    await sendBlog(testHelper.blog);
    const secondDB = await initialDB();
    await api.delete(`/api/blogs/${secondDB[secondDB.length - 1].id}`);
    expect(firstDB.length).toBe((await initialDB()).length);
  });
});

describe('a put request with a given ID', () => {
  test('a put request is responded with a 202', async () => {
    const db = await initialDB();
    await api
      .put(`/api/blogs/${db[0].id}`)
      .send(db[0])
      .expect(202);
  });

  test('a put request sucessfully updates the number of likes', async () => {
    const firstDB = await initialDB();
    const blog = firstDB[0];
    blog.likes += 12;
    const expectedLikes = blog.likes;
    await api.put(`/api/blogs/${blog.id}`).send(blog);
    const secondDB = (await initialDB()).map(blog => blog.likes);
    expect(secondDB).toContain(expectedLikes);
  });
});
