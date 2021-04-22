import Joi from '@hapi/joi';
import { IVideogame } from '../models/Videogame';

export const videogameDto = Joi.object<IVideogame>({
  name: Joi.string(),
  platform: Joi.string().required(),
  genre: Joi.string().required(),
  publisher: Joi.string().required(),
  developer: Joi.string().required(),
  rating: Joi.string(),
  naSales: Joi.number(),
  jpSales: Joi.number(),
  erSales: Joi.number(),
  criticScore: Joi.number(),
  otherSales: Joi.number(),
  globalSales: Joi.number(),
  yearOfRelase: Joi.number().required(),
  userScore: Joi.number().required(),
});
