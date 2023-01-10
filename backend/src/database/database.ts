import { CONNECTION_NAMES } from './../constants/database';
import { Connection, Connections, DatabaseFactory } from "./database-factory";


export default class Database {
  connections: Connections;
  factory: DatabaseFactory;

  constructor(factory: DatabaseFactory) {
    this.connections = {};
    this.factory = factory;
  }

  addConnection(name: string, connectionString: string) {
    this.connections[name] = this.factory.createConnection(connectionString);
  }

  getConnection(name: string = CONNECTION_NAMES.default): Connection {
    return this.connections[name];
  }
}
