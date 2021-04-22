import Joi from '@hapi/joi';
import { videogameDto } from '../../src/dtos/videogame.dto';
import { exampleVideogame } from '../__fixtures__/videogame';

describe('VideoGame DTO', () => {
  test('Validation errors should not be present if all fields are ok', () => {
    const { error } = videogameDto.validate(exampleVideogame);

    expect(error).toBeUndefined();
  });

  test('Validation should have errors if object is invalid', () => {
    const { error } = videogameDto.validate({ ...exampleVideogame, name: 123, platform: undefined });

    expect(error).toBeInstanceOf(Joi.ValidationError);
    expect(error.details.length).toBeGreaterThan(0);
  });
});
