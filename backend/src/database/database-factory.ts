import mongoose, { ConnectOptions } from 'mongoose';

export type Connection = mongoose.Connection;

export interface Connections {
  [key: string]: Connection;
}

export interface DatabaseFactory {
  createConnection(connectionString: string): Connection;
}

export class MongooseDatabaseFactory implements DatabaseFactory {
  createConnection(connectionString: string): Connection {
    return mongoose.createConnection(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
  }
}