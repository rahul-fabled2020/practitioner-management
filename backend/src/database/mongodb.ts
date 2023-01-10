import Database from "./database";
import { CONNECTION_NAMES } from "./../constants/database";
import { MongooseDatabaseFactory } from "./database-factory";

const mongooseFactory = new MongooseDatabaseFactory();
const database = new Database(mongooseFactory);

database.addConnection(
  CONNECTION_NAMES.default,
  "mongodb://localhost:27017/practitioner-management"
);
// database.addConnection(
//   "secondary",
//   "mongodb://localhost:27017/my_other_database"
// );

export default database;
