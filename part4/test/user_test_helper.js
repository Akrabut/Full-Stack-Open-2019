const listWithOneUser =
[
  {
    name: 'Ehad',
    username: 'ehadehad',
    password: '1111111',
  }
];

const listWithUsers =
[
  {
    name: 'Ehad',
    username: 'ehaddd',
    password: '1111111',
  },
  {
    name: 'Shtaim',
    username: 'shtaimmm',
    password: '2222222',
  },
  {
    name: 'Shalosh',
    username: 'shaloshhh',
    password: '3333333',
  }
];

const user = {
  name: 'test',
  username: 'tester',
  password: '1234567',
};

const invalidUsers = [
  {
    name: 'someone',
    username: 'shaloshhh',
    password: '123456',
  },
  {
    name: 'mishu',
    password: '235235213',
  },
  {
    name: 'somename',
    username: 'hi',
    password: '123',
  }
];

module.exports = { 
  listWithOneUser,
  listWithUsers,
  user,
  invalidUsers,
};
