const app = require('../../index');
const api = require('supertest')(app.app);
const User = require('../../models/user');
const testHelper = require('../user_test_helper');

beforeEach(async () => {
  await User.deleteMany({});
  const userObjects = testHelper.listWithUsers.map(user => new User(user));
  const users = userObjects.map(blog => blog.save());
  await Promise.all(users);
});

// afterAll(async () => {
//   await app.mongoose.disconnect();
//   app.server.close();
// });

async function currentDB() {
  return (await api.get('/api/users')).body;
}

async function sendUser(user) {
  return api.post('/api/users').send(user);
}

describe('get request without an id', () => {
  test('valid request is responded with 200 and in json format', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('length of response body is equal to the initial state of the database', async () => {
    const body = await currentDB();
    expect(body.length).toBe(testHelper.listWithUsers.length);
  });
});

describe('post request with a new user', () => {
  test('valid user is successfully added', async () => {
    await api
      .post('/api/users')
      .send(testHelper.user)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('database length is one entry bigger', async () => {
    const initialLength = (await currentDB()).length;
    await sendUser(testHelper.user);
    expect((await currentDB()).length).toBe(initialLength + 1);
  });

  test('new user is properly added to the database', async () => {
    await sendUser(testHelper.user);
    expect((await currentDB()).map(user => user.name)).toContain('test');
  });

  describe('post request with invalid user objects is not accepted', async () => {
    test('an invalid request is responded with the proper code and error', async () => {
      await api
        .post('/api/users')
        .send(testHelper.invalidUsers[0])
        .expect(400)
        .expect(/error/);
    });

    test('objects with missing or invalid properties are not saved', async () => {
      const initialLength = (await currentDB()).length;
      const res = testHelper.invalidUsers.map(user => sendUser(user));
      await Promise.all(res);
      expect(initialLength).toBe((await currentDB()).length);
    });
  });
});