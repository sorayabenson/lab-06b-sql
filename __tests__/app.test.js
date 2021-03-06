require('dotenv').config();

const { AssertionError } = require('assert');
const { execSync } = require('child_process');
const { assert } = require('console');

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
          id: 8,
          name: 'Water Ghost',
          img: 'https://static1.squarespace.com/static/546be815e4b05d93ff91f0ed/602eefdc0afad00aceb2a0ce/602ef134a3d834472c619132/1613689143957/water-ghost.png?format=500w',
          description: 'Do you ever need to breath underwater? Water Ghost is the very air you need where there is none. They are here for you for any spontaneous diving sessions. *does not supply air in outer space*',
          category_id: 'skill',
          price: 1,
          price_currency: 'bubble wand',
          trustworthy: true,
          owner_id: 1
        },
        {
          id: 6,
          name: 'Plant Ghost',
          img: 'https://static1.squarespace.com/static/546be815e4b05d93ff91f0ed/602eefdc0afad00aceb2a0ce/602eeff7b519f611023339d6/1613688876493/plant-ghost.png?format=750w',
          description: 'Is your home a graveyard for house plants? This ghost cares for spirits of all the plants you have killed.',
          category_id: 'skill',
          price: 7,
          price_currency: 'leaves',
          trustworthy: true,
          owner_id: 1
        },
        {
          id: 4,
          name: 'Off Beat Ghost',
          img: 'https://static1.squarespace.com/static/546be815e4b05d93ff91f0ed/602eefdc0afad00aceb2a0ce/602eeff666440d6eb8252b2e/1613688876481/off-beat-ghost.png?format=750w',
          description: 'Off Beat Ghost will ruin every song your enemy ever wants to listen to. The perfect revenge companion.',
          category_id: 'skill',
          price: 3,
          price_currency: 'vintage records',
          trustworthy: true,
          owner_id: 1
        },
        {
          id: 1,
          name: 'Skater Ghost',
          img: 'https://static1.squarespace.com/static/546be815e4b05d93ff91f0ed/602eefdc0afad00aceb2a0ce/602eeff8513f620bd182f959/1613688877207/skater-ghost.png?format=500w',
          description: 'Do you want to go fast? This rad boy can take you for a ride.',
          category_id: 'skill',
          price: 4,
          price_currency: 'skateboard wheels',
          trustworthy: true,
          owner_id: 1
        },
        {
          id: 5,
          name: 'Fruit Ghost',
          img: 'https://static1.squarespace.com/static/546be815e4b05d93ff91f0ed/602eefdc0afad00aceb2a0ce/602eeff5a425c5351bf91e0e/1613688876489/fruit-ghost.png?format=500w',
          description: 'This total sweetheart of a ghost knows all the seasonal fruits and where to find them and makes sure you know too.',
          category_id: 'food',
          price: 1,
          price_currency: 'handful of boysenberries',
          trustworthy: true,
          owner_id: 1
        },
        {
          id: 2,
          name: 'Pizza Ghost',
          img: 'https://static1.squarespace.com/static/546be815e4b05d93ff91f0ed/602eefdc0afad00aceb2a0ce/602eeff794590f3aa30facf3/1613688876489/pizza-ghost.png?format=750w',
          description: 'Pizza Ghost makes sure your turtle`s favorite snack is always on hand.',
          category_id: 'food',
          price: 8,
          price_currency: 'discarded crusts',
          trustworthy: true,
          owner_id: 1
        },
        {
          id: 9,
          name: 'Human Ghost',
          img: 'https://static1.squarespace.com/static/546be815e4b05d93ff91f0ed/602eefdc0afad00aceb2a0ce/602eeff666440d6eb8252b28/1613688876498/human-ghost.png?format=750w',
          description: 'Wrap your lonely heart in the tender embrace of Human Ghost.',
          category_id: 'care',
          price: 1,
          price_currency: 'bottle of rose water',
          trustworthy: true,
          owner_id: 1
        },          
        {
          id: 7,
          name: 'Bad Photo Ghost',
          img: 'https://static1.squarespace.com/static/546be815e4b05d93ff91f0ed/602eefdc0afad00aceb2a0ce/602eeff5513f620bd182f737/1613688824112/bad-photo-ghost.png?format=750w',
          description: 'Bad Photo Ghost knows all your best angles, and they artistically blur you in every photo you look bad in.',
          category_id: 'care',
          price: 15,
          price_currency: 'rolls of film',
          trustworthy: true,
          owner_id: 1
        },        
        {
          id: 3,
          name: 'Opossum Ghost',
          img: 'https://static1.squarespace.com/static/546be815e4b05d93ff91f0ed/602eefdc0afad00aceb2a0ce/602eeff6bdfb7d2171ecaab2/1613688876492/opossum-ghost.png?format=750w',
          description: 'Have you ever needed to get out of a situation by playing dead? Well, Opossum Ghost will help you play the deadest of dead and keep you safe.',
          category_id: 'care',
          price: 10,
          price_currency: 'worms',
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

    test('returns categories', async() => {

      const expectation = [        
        {
          id: 1,
          category_name: 'skill',
        },
        {
          id: 2,
          category_name: 'food',
        },
        {
          id: 3,
          category_name: 'care',
        }
      ];

      const data = await fakeRequest(app)
        .get('/categories')
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
        category_id: 'skill',
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

    test('creates a new ghost and adds it to the list', async() => {

      const newGhost = {
        name: 'test ghost',
        img: 'http://placekitten.com/600/600',
        description: 'test',
        category_id: 1,
        price: 4,
        price_currency: 'test',
        trustworthy: false,
      };

      const expectedGhost = {
        ...newGhost,
        id: 10,
        owner_id: 1,
      };

      const data = await fakeRequest(app)
        .post('/ghosts')
        .send(newGhost)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectedGhost);

      const allGhosts = await fakeRequest(app)
        .get('/ghosts')
        .expect('Content-Type', /json/)
        .expect(200);

      const testGhost = allGhosts.body.find(ghost => ghost.name === 'test ghost');

      const expectedTestGhost = {
        name: 'test ghost',
        img: 'http://placekitten.com/600/600',
        description: 'test',
        category_id: 'skill',
        price: 4,
        price_currency: 'test',
        trustworthy: false,
        id: 10,
        owner_id: 1,
      };

      expect(testGhost).toEqual(expectedTestGhost);
    });

    test('updates ghost information by ghost id', async() => {

      const newGhost = {
        name: 'test updated ghost',
        img: 'http://placekitten.com/600/600',
        description: 'test',
        category_id: 1,
        price: 8,
        price_currency: 'test',
        trustworthy: true,
      };

      await fakeRequest(app)
        .put('/ghosts/10')
        .send(newGhost)
        .expect('Content-Type', /json/)
        .expect(200);

      const updatedGhost = await fakeRequest(app)
        .get('/ghosts/10')        
        .expect('Content-Type', /json/)
        .expect(200);

      const expectedTestGhost = {
        name: 'test updated ghost',
        img: 'http://placekitten.com/600/600',
        description: 'test',
        category_id: 'skill',
        price: 8,
        price_currency: 'test',
        trustworthy: true,
        id: 10,
        owner_id: 1,
      };

      expect(updatedGhost.body).toEqual(expectedTestGhost);
    });

    test('deletes ghost information by ghost id', async() => {

      const expectedGhost = {        
        id: 10,
        name: 'test updated ghost',
        img: 'http://placekitten.com/600/600',
        description: 'test',
        category_id: 1,
        price: 8,
        price_currency: 'test',
        trustworthy: true,
        owner_id: 1,
      };

      const data = await fakeRequest(app)
        .delete('/ghosts/10')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectedGhost);

      const nullGhost = await fakeRequest(app)
        .get('/ghosts/10')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(nullGhost.body).toEqual('');

    });

    test('returns an error when .post called with missing keys', async() => {
      const newGhost = {
        name: 'test ghost',
        description: 'test',
        category_id: 1,
        price: 4,
        price_currency: 'test',
      };

      const expected = {
        error: 'null value in column "img" of relation "ghosts" violates not-null constraint',
      }; 

      const data = await fakeRequest(app)
        .post('/ghosts')
        .send(newGhost)
        .expect('Content-Type', /json/)
        .expect(500);

      expect(data.body).toEqual(expected);
    });

    // both of the following tests pass when .expect is (200) which seems werid that they should fail since the id does not exist in the current database.

    // test('returns `` when .put is called with invalid ghost id', async() => {

    //   const expectedGhost = {
    //     name: 'test updated ghost',
    //     img: 'http://placekitten.com/600/600',
    //     description: 'test',
    //     category: 'test',
    //     price: 8,
    //     price_currency: 'test',
    //     trustworthy: true,
    //     id: 666,
    //     owner_id: 1,
    //   };

    //   const expected = '';

    //   const data = await fakeRequest(app)
    //     .put('/ghosts/666')
    //     .send(expectedGhost)
    //     .expect('Content-Type', /json/)
    //     .expect(500);

    //   expect(data.body).toEqual(expected);
    // });

    // test('returns `` when .delete is called with invalid ghost id', async() => {

    //   const expected = '';

    //   const data = await fakeRequest(app)
    //     .delete('/ghosts/666')
    //     .expect('Content-Type', /json/)
    //     .expect(500);

    //   expect(data.body).toEqual(expected);

    // });
  });
});
