import mongoose from "mongoose";
import { Document, Schema, Model } from "mongoose";

import database from "../database/mongodb";

export interface UserSchemaType extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema: Schema<UserSchemaType> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { collection: "users" }
);

const User: Model<UserSchemaType> = database
  .getConnection()
  .model("User", userSchema);

export { User };
