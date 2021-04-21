import { videogameDto } from "dtos/videogame.dto";
import { RequestHandler } from "express";
import requestMiddleware from "middleware/request-middleware";
import {
  createVideogame,
  deleteVideogame,
  findVideogameById,
  findVideogames,
  updateVideogame,
} from "services/videogame.service";

export const create: RequestHandler = async (req, res) => {
  const videogame = req.body;
  console.log(videogame);

  const newVideogame = await createVideogame(videogame);

  res.send({
    message: "Saved",
    videogame: newVideogame.toJSON(),
  });
};

export const createMiddleware = requestMiddleware(create, {
  validation: { body: videogameDto },
});

export const findById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const videogame = await findVideogameById(id);

  res.send({
    message: "List",
    videogame: videogame.toJSON(),
  });
};

export const findAll: RequestHandler = async (req, res) => {
  const videogames = await findVideogames();

  res.send({
    message: "List",
    videogame: videogames,
  });
};

export const uptade: RequestHandler = async (req, res) => {
  const videogame = req.body;
  const { id } = req.params;

  const newVideogame = await updateVideogame(videogame, id);

  res.send({
    message: "Update",
    videogame: newVideogame.toJSON(),
  });
};

export const deleteVideogameById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const videogame = await deleteVideogame(id);

  res.send({
    message: "Update",
    videogame,
  });
};
