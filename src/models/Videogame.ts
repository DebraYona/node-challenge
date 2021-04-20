import {
    Model, Schema, model
  } from 'mongoose';
  import TimeStampPlugin, {
    ITimeStampedDocument
  } from './plugins/timestamp-plugin';
  
  export interface IVideogame extends ITimeStampedDocument {
    name: string;
    platform: string;
    yearOfRelase: Number;
    genre: String;
    publisher: String;
    naSales: Number;
    erSales: Number;
    jpSales: Number;
    otherSales: Number;
    globalSales: Number;
    criticScore: Number;
    userScore: Number;
    developer: String;
    rating: String; 
  }
  
  interface IVideogameModel extends Model<IVideogame> { }
  
  const schema = new Schema<IVideogame>({
    name: { type: String, index: true, required: true },
    platform: { type: String, index: true, required: true },
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
    rating: { type: String }
  });
  
  schema.plugin(TimeStampPlugin);
  
  const Videogame: IVideogameModel = model<IVideogame, IVideogameModel>('Videogame', schema);
  
  export default Videogame;
  