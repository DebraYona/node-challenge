import { Model, Schema, model } from "mongoose";
import TimeStampPlugin, {
  ITimeStampedDocument,
} from "./plugins/timestamp-plugin";

export interface IPlatform extends ITimeStampedDocument {
  name: string;
}

type IPlatformModel = Model<IPlatform>;

const schema = new Schema<IPlatform>({
  name: { type: String },
});

schema.plugin(TimeStampPlugin);

const Platform: IPlatformModel = model<IPlatform, IPlatformModel>(
  "Platform",
  schema
);

export default Platform;
