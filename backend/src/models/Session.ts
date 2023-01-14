import mongoose from "mongoose";
import { Document, Schema, Model } from "mongoose";

import database from "../database/mongodb";

export interface SessionSchemaType extends Document {
  userId: string;
  refreshToken: string;
}

const sessionSchema: Schema<SessionSchemaType> = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  { collection: "sessions" }
);

const Session: Model<SessionSchemaType> = database
  .getConnection()
  .model("Session", sessionSchema);

export { Session };
