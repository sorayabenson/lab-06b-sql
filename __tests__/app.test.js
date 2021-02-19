require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');

describe('app routes', () => {
  describe('routes', () => {
    let token;
  
    beforeAll(async done => {
      execSync('npm run setup-db');
  
      client.connect();
  
      const signInData = await fakeRequest(app)
        .post('/auth/signup')
        .send({
          email: 'jon@user.com',
          password: '1234'
        });
      
      token = signInData.body.token; // eslint-disable-line
  
      return done();
    });
  
    afterAll(done => {
      return client.end(done);
    });

    test('returns ghosts', async() => {

      const expectation = [
        {
          id: 1,
          name: 'Skater Ghost',
          img: 'https://static1.squarespace.com/static/546be815e4b05d93ff91f0ed/602eefdc0afad00aceb2a0ce/602eeff8513f620bd182f959/1613688877207/skater-ghost.png?format=500w',
          description: 'Do you want to go fast? This rad boy can take you for a ride.',
          category: 'skill',
          price: 4,
          price_currency: 'skateboard wheels',
          trustworthy: true,
          owner_id: 1
        },
        {
          id: 2,
          name: 'Pizza Ghost',
          img: 'https://static1.squarespace.com/static/546be815e4b05d93ff91f0ed/602eefdc0afad00aceb2a0ce/602eeff794590f3aa30facf3/1613688876489/pizza-ghost.png?format=750w',
          description: 'Pizza Ghost makes sure your turtle`s favorite snack is always on hand.',
          category: 'food',
          price: 8,
          price_currency: 'discarded crusts',
          trustworthy: true,
          owner_id: 1
        },
        {
          id: 3,
          name: 'Opossum Ghost',
          img: 'https://static1.squarespace.com/static/546be815e4b05d93ff91f0ed/602eefdc0afad00aceb2a0ce/602eeff6bdfb7d2171ecaab2/1613688876492/opossum-ghost.png?format=750w',
          description: 'Have you ever needed to get out of a situation by playing dead? Well, Opossum Ghost will help you play the deadest of dead and keep you safe.',
          category: 'care',
          price: 10,
          price_currency: 'worms',
          trustworthy: true,
          owner_id: 1
        },
        {
          id: 4,
          name: 'Off Beat Ghost',
          img: 'https://static1.squarespace.com/static/546be815e4b05d93ff91f0ed/602eefdc0afad00aceb2a0ce/602eeff666440d6eb8252b2e/1613688876481/off-beat-ghost.png?format=750w',
          description: 'Off Beat Ghost will ruin every song your enemy ever wants to listen to. The perfect revenge companion.',
          category: 'skill',
          price: 3,
          price_currency: 'vintage records',
          trustworthy: true,
          owner_id: 1
        },
        {
          id: 5,
          name: 'Fruit Ghost',
          img: 'https://static1.squarespace.com/static/546be815e4b05d93ff91f0ed/602eefdc0afad00aceb2a0ce/602eeff5a425c5351bf91e0e/1613688876489/fruit-ghost.png?format=500w',
          description: 'This total sweetheart of a ghost knows all the seasonal fruits and where to find them and makes sure you know too.',
          category: 'food',
          price: 1,
          price_currency: 'handful of boysenberries',
          trustworthy: true,
          owner_id: 1
        },
        {
          id: 6,
          name: 'Plant Ghost',
          img: 'https://static1.squarespace.com/static/546be815e4b05d93ff91f0ed/602eefdc0afad00aceb2a0ce/602eeff7b519f611023339d6/1613688876493/plant-ghost.png?format=750w',
          description: 'Is your home a graveyard for house plants? This ghost cares for spirits of all the plants you have killed.',
          category: 'skill',
          price: 7,
          price_currency: 'leaves',
          trustworthy: true,
          owner_id: 1
        },
        {
          id: 7,
          name: 'Bad Photo Ghost',
          img: 'https://static1.squarespace.com/static/546be815e4b05d93ff91f0ed/602eefdc0afad00aceb2a0ce/602eeff5513f620bd182f737/1613688824112/bad-photo-ghost.png?format=750w',
          description: 'Bad Photo Ghost knows all your best angles, and they artistically blur you in every photo you look bad in.',
          category: 'care',
          price: 15,
          price_currency: 'rolls of film',
          trustworthy: true,
          owner_id: 1
        },
        {
          id: 8,
          name: 'Water Ghost',
          img: 'https://static1.squarespace.com/static/546be815e4b05d93ff91f0ed/602eefdc0afad00aceb2a0ce/602ef134a3d834472c619132/1613689143957/water-ghost.png?format=500w',
          description: 'Do you ever need to breath underwater? Water Ghost is the very air you need where there is none. They are here for you for any spontaneous diving sessions. *does not supply air in outer space*',
          category: 'skill',
          price: 1,
          price_currency: 'bubble wand',
          trustworthy: true,
          owner_id: 1
        },
        {
          id: 9,
          name: 'Human Ghost',
          img: 'https://static1.squarespace.com/static/546be815e4b05d93ff91f0ed/602eefdc0afad00aceb2a0ce/602eeff666440d6eb8252b28/1613688876498/human-ghost.png?format=750w',
          description: 'Wrap your lonely heart in the tender embrace of Human Ghost.',
          category: 'care',
          price: 1,
          price_currency: 'bottle of rose water',
          trustworthy: true,
          owner_id: 1
        }
      ];

      const data = await fakeRequest(app)
        .get('/ghosts')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });

    test('returns one ghost with matching id', async() => {

      const expectation = {
        id: 1,
        name: 'Skater Ghost',
        img: 'https://static1.squarespace.com/static/546be815e4b05d93ff91f0ed/602eefdc0afad00aceb2a0ce/602eeff8513f620bd182f959/1613688877207/skater-ghost.png?format=500w',
        description: 'Do you want to go fast? This rad boy can take you for a ride.',
        category: 'skill',
        price: 4,
        price_currency: 'skateboard wheels',
        trustworthy: true,
        owner_id: 1
      };

      const data = await fakeRequest(app)
        .get('/ghosts/1')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });
  });
});
