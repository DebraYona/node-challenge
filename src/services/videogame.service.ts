import { IVideogame } from "models/Videogame";
import { videogameRepository } from "repositories/videogame.repository";

export const findVideogames = async () => {
  return videogameRepository.find();
};

export const findVideogameById = async (id: string) => {
  return videogameRepository.findById(id);
};

export const createVideogame = async (videogame: IVideogame) => {
  console.log(videogame);

  return videogameRepository.create(videogame);
};

export const updateVideogame = async (videogame: IVideogame, id: string) => {
  return videogameRepository.update(videogame, id);
};

export const deleteVideogame = async (id: string) => {
  return videogameRepository.delete(id);
};
