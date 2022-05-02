import supertest from 'supertest';
import app from '../app';

const request = supertest(app);

describe('server side rendering', () => {
  describe('GET /', () => {
    it('should redirect to /', async () => {
      await request.get('/').expect('Location', '/');
    });
  });

  describe('GET /page-not-found', () => {
    it('should render html', async () => {
      await request.get('/page-not-found').expect(404);
    });
  });
});
