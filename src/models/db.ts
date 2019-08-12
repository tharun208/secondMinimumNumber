import { Db, MongoClient } from 'mongodb';
import config from '../config';
import { DataTable } from './minimum';

export default class DbConn {
  static data: DataTable;
  private static userDb: Db;
  static async init() {
    const mclient = await MongoClient.connect(config.serviceMongoDB, {
      useNewUrlParser: true,
    });
    DbConn.userDb = mclient.db('find-second-minimum');
    DbConn.data = new DataTable(DbConn.userDb, 'data');
  }
}
