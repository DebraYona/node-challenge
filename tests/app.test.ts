/* eslint-disable jest/no-done-callback,sonarjs/no-duplicate-string */
import { createVideogame, findVideogameById } from 'services/videogame.service';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../src/app';
import { exampleVideogame } from './__fixtures__/videogame';

jest.setTimeout(600000);

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(
    mongoUri,
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false },
    (err) => {
      if (err) console.error(err);
    },
  );
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('App Test', () => {
  it('GET /videogame/ should return 200, and return a list', async () => {
    const response = await request(app).get('/videogame/');

    expect(response.status).toBe(200);
    expect(response.body.videogame).toBeTruthy();
    expect(Array.isArray(response.body.videogame)).toBe(true);
  });

  it('GET /videogame/:id should return 200 and a videogame', async () => {
    const newVideogame = await createVideogame(exampleVideogame);
    const response = await request(app).get(`/videogame/${newVideogame._id}`);

    expect(response.status).toBe(200);
    expect(response.body.videogame).toBeTruthy();
    expect(typeof response.body.videogame).toBe('object');
    expect(response.body.videogame.name).toBe(newVideogame.name);
  });

  it('POST /videogame/add should return 200 and a videogame', async () => {
    const response = await request(app).post('/videogame/add').send(exampleVideogame);

    expect(response.status).toBe(200);
    expect(response.body.videogame).toBeTruthy();
    expect(typeof response.body.videogame).toBe('object');
    expect(response.body.videogame.name).toBe(exampleVideogame.name);
    expect(response.body.videogame._id).toBeTruthy();
  });

  it('PUT /videogame/:id should return 200 and a videogame', async () => {
    const newVideogame = await createVideogame(exampleVideogame);
    const newPlatform = 'apiPlatform';
    const response = await request(app)
      .put(`/videogame/${newVideogame._id}`)
      .send({ ...exampleVideogame, platform: newPlatform });

    expect(response.status).toBe(200);
    expect(response.body.videogame).toBeTruthy();
    expect(typeof response.body.videogame).toBe('object');
    expect(response.body.videogame.platform).toBe(newPlatform);
    expect(response.body.videogame._id).toBeTruthy();
  });

  it('DELETE /videogame/:id should return 200 and a videogame', async () => {
    const newVideogame = await createVideogame(exampleVideogame);
    const response = await request(app).delete(`/videogame/${newVideogame._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();

    const videogame = await findVideogameById(newVideogame._id);
    expect(videogame).toBeNull();
  });
});
