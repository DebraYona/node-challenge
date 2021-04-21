import { IVideogame, Videogame, IVideogameModel } from "models/Videogame";
import { BaseRepository } from "./base.repository";

export class VideoGameRepository implements BaseRepository<IVideogame> {
  private videogame: IVideogameModel;

  constructor(videogame: IVideogameModel) {
    this.videogame = videogame;
  }

  async findById(id: string): Promise<IVideogame> {
    return this.videogame.findById(id);
  }

  async find(): Promise<IVideogame[]> {
    return this.videogame.find();
  }

  async create(entity: IVideogame): Promise<IVideogame> {
    console.log(entity);
    const videogame = new Videogame(entity);
    return videogame.save();
  }

  async update(entity: IVideogame, id: string): Promise<IVideogame> {
    return this.videogame.findByIdAndUpdate(id, entity, {
      new: true,
    });
  }

  async delete(id: string): Promise<IVideogame> {
    return this.videogame.findByIdAndDelete(id);
  }
}

export const videogameRepository = new VideoGameRepository(Videogame);
