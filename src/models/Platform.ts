import { Model, Schema, model } from "mongoose";
import TimeStampPlugin, {
  ITimeStampedDocument
} from "./plugins/timestamp-plugin";

export interface IPlatform extends ITimeStampedDocument {
  name: string;
}

interface IPlatformModel extends Model<IPlatform> {}

const schema = new Schema<IPlatform>({
  name: { type: String, index: true, required: true },
});

schema.plugin(TimeStampPlugin);

const Platform: IPlatformModel = model<IPlatform, IPlatformModel>(
  "Platform",
  schema
);

export default Platform;
