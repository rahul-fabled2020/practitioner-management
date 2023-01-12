import Database from "./database";
import { mongooseConfig } from "../config/config";
import { CONNECTION_NAMES } from "./../constants/database";
import { MongooseDatabaseFactory } from "./database-factory";

const mongooseFactory = new MongooseDatabaseFactory();
const database = new Database(mongooseFactory);

database.addConnection(
  CONNECTION_NAMES.default,
  mongooseConfig.connectionUrl as string
);

export default database;
