import dotenv from "dotenv";

const result = dotenv.config();
if (result.error) {
  dotenv.config({ path: "./.env" });
}

export default () => {};
