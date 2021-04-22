import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import {
  createVideogame,
  deleteVideogame,
  findVideogameById,
  findVideogames,
  updateVideogame,
} from '../../src/services/videogame.service';
import { exampleVideogame } from '../__fixtures__/videogame';

jest.setTimeout(600000);

let mongoServer: MongoMemoryServer;

beforeEach(async () => {
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

afterEach(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('VideoGame Service', () => {
  it('Should find all documents', async () => {
    const videogames = await findVideogames();
    expect(videogames.length).toEqual(0);
  });

  it('Should get a document', async () => {
    const newVideogame = await createVideogame(exampleVideogame);
    const videogame = await findVideogameById(newVideogame._id);

    expect(videogame.name).toBe(exampleVideogame.name);
    expect(videogame.platform).toBe(exampleVideogame.platform);
    expect(videogame.yearOfRelase).toBe(exampleVideogame.yearOfRelase);
    expect(videogame.publisher).toBe(exampleVideogame.publisher);
  });

  it('Should create a document', async () => {
    const newVideogame = await createVideogame(exampleVideogame);
    expect(newVideogame).toBeTruthy();
    expect(typeof newVideogame._id).toEqual('object');
    expect(String(newVideogame._id).length).toBe(24);
  });

  it('Should update a document', async () => {
    const newPublisher = 'updatedPublisher';
    const newVideogame = await createVideogame(exampleVideogame);
    const updatedVideogame = await updateVideogame({ ...exampleVideogame, publisher: newPublisher }, newVideogame._id);
    expect(updatedVideogame._id).toEqual(newVideogame._id);
    expect(updatedVideogame.publisher).toEqual(newPublisher);
  });

  it('Should delete a document', async () => {
    const newVideogame = await createVideogame(exampleVideogame);
    await deleteVideogame(newVideogame._id);
    const videogame = await findVideogameById(newVideogame._id);
    expect(videogame).toBeNull();
  });
});
