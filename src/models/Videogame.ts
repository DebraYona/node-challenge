import { Model, Schema, model } from 'mongoose';
import TimeStampPlugin, { ITimeStampedDocument } from './plugins/timestamp-plugin';

export interface IVideogame {
  _id?: string;
  name: string;
  platform: string;
  yearOfRelase: number;
  genre: string;
  publisher: string;
  naSales: number;
  erSales: number;
  jpSales: number;
  otherSales: number;
  globalSales: number;
  criticScore: number;
  userScore: number;
  developer: string;
  rating: string;
}

export type IVideogameDocument = IVideogame & ITimeStampedDocument;

export type IVideogameModel = Model<IVideogameDocument>;

const schema = new Schema<IVideogameDocument>({
  name: { type: String, required: true },
  // platform: { type: Schema.Types.ObjectId, ref: "Platform" },
  platform: { type: String },

  yearOfRelase: { type: Number },
  genre: { type: String },
  publisher: { type: String },
  naSales: { type: Number },
  erSales: { type: Number },
  jpSales: { type: Number },
  otherSales: { type: Number },
  globalSales: { type: Number },
  criticScore: { type: Number },
  userScore: { type: Number },
  developer: { type: String },
  rating: { type: String },
});

schema.plugin(TimeStampPlugin);

export const Videogame: IVideogameModel = model<IVideogameDocument, IVideogameModel>('Videogame', schema);
