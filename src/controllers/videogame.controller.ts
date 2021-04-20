import { RequestHandler } from "express";
import {
  createVideogame,
  deleteVideogame,
  findVideogameById,
  findVideogames,
  updateVideogame,
} from "services/videogame.service";

export const create: RequestHandler = async (req, res) => {
  const { videogame } = req.body;

  const newVideogame = await createVideogame(videogame);

  res.send({
    message: "Saved",
    videogame: newVideogame.toJSON(),
  });
};

export const findById: RequestHandler = async (req, res) => {
  const { idVideogame } = req.body;

  const videogame = await findVideogameById(idVideogame);

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
  const { videogame, id } = req.body;

  const newVideogame = await updateVideogame(videogame, id);

  res.send({
    message: "Update",
    videogame: newVideogame.toJSON(),
  });
};

export const deleteVideogameById: RequestHandler = async (req, res) => {
  const { id } = req.body;

  const videogame = await deleteVideogame(id);

  res.send({
    message: "Update",
    videogame,
  });
};
