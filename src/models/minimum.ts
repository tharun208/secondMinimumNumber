import { Collection, Db as DbConn } from 'mongodb';
import { INumber } from '../types';

function convMongoId(obj: any) {
  const { _id, ...rest } = obj;
  return { id: _id, ...rest };
}

export class DataTable {
  colConn: Collection;
  constructor(db: DbConn, tbl: string) {
    this.colConn = db.collection(tbl);
  }
  async list(): Promise<INumber[]> {
    const userData = await this.colConn.find({}).toArray();
    return userData.map(convMongoId);
  }
  async findByInput(input: Array<number>): Promise<INumber | null> {
    const userData = await this.colConn.findOne({ input: input });
    return userData ? convMongoId(userData) : null;
  }
  async save(value: INumber): Promise<void> {
    const { id, ...rest } = value;
    await this.colConn.updateOne({ _id: id }, { $set: { ...rest } }, { upsert: true });
  }
}
