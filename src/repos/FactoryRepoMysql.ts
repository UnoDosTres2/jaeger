import type Factory from "../core/entities/Factory";
import type FactoryRepo from "../core/repos/FactoryRepo";
import { type _type as MysqlType } from "../context/backingServices/mysql";

export default class FactoryRepoMysql implements FactoryRepo {
  #conn: MysqlType;

  constructor(conn: MysqlType) {
    this.#conn = conn;
  }

  /** @throws {ExternalError} */
  save(entity: Omit<Factory, "id">): Factory {
    // FIXME save to db and get the id;
    const id = Date.now().toString(32);

    return {
      ...entity,
      id,
    };
  }
}
