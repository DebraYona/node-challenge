import { Videogame } from 'models/Videogame';
import { createVideogame } from 'services/videogame.service';
import request from 'supertest';
import app from '../src/app';

jest.mock('../src/models/Book');

describe('App Test', () => {
  test('GET /random-url should return 404', (done) => {
    request(app).get('/reset').expect(404, done);
  });

  test('GET /videogame/ should return 200', (done) => {
    request(app).get('/videogame/').expect(200, done);
  });

  test('Create should dispatch subscribers', async (done) => {
    const videojuego = new Videogame();
    videojuego.name = '1';
    videojuego.platform = 'John';
    videojuego.yearOfRelase = 1992;
    videojuego.email = 'john.doe@test.com';
    const userService = createVideogame(videojuego);
    const newUser = await createVideogame(videojuego);
    expect(ed.dispatchMock).toBeCalledWith([events.user.created, newUser]);
    done();
  });
});
