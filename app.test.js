const request = require('supertest');
const generateToken = require('./generateToken');

const app = require('./app');

describe('Test API with cookie', function() {
  const agent = request.agent(app);
  let token = '';

  beforeAll(async () => {
    token = await generateToken();
  })

  test('login', function(done) {
    agent
      .post('/sessionLogin')
      .send({
        idToken: token,
      })
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        return done();
      });

  });
  // các API sau đã được persis cookie vào agent nên ko cần thêm cookie
  test('get profile', function(done) {
    agent
      .get('/profile')
      .expect(200)
      .expect({ name: 'test_name' })
      .end(function(err, res) {
        if (err) return done(err);
        return done();
      });
  });

  test('update profile with empty name', function(done) {
    agent
      .put('/profile')
      .send({ name: ''})
      .expect(500)
      .expect({ status: 'Update profile error' })
      .end(function(err, res) {
        if (err) return done(err);
        return done();
      });
  });

  test('update profile', function(done) {
    agent
      .put('/profile')
      .send({ name: 'test'})
      .expect(200)
      .expect({ status: 'Update profile success' })
      .end(function(err, res) {
        if (err) return done(err);
        return done();
      });
  });
});

describe('Test API with no cookie', function() {
  const agent = request.agent(app);

  test('login', function(done) {
    agent
      .post('/sessionLogin')
      .send({ idToken: '' })
      .expect(401)
      .end(function(err, res) {
        if (err) return done(err);
        return done();
      });

  });

  test('get profile', function(done) {
    agent
      .get('/profile')
      .expect(401)
      .end(function(err, res) {
        if (err) return done(err);
        return done();
      });
  });

  test('update profile', function(done) {
    agent
      .put('/profile')
      .expect(401)
      .end(function(err, res) {
        if (err) return done(err);
        return done();
      });
  });
});