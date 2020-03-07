import { Sequelize, Transaction } from "sequelize";

let _db = null;

let _schema = null;

export function get_db() {
  return _db;
}

export function get_schema() {
  return _schema;
}

export async function connect_db(
  host,
  port,
  username,
  password,
  schema,
  database,
  logging,
  logger
) {
  if (_db !== null) {
    return _db;
  }

  try {
    const db_config = {
      host,
      port,
      username,
      password,
      database,
      dialect: "postgres",
      native: false,
      logging:
        logging === true || logging === false
          ? logging
          : (...args) => {
              if (logger !== undefined) {
                logger.trace(args[0], "Search-Communities::Sequelize logging");
              } else {
                console.trace(args[0], "Search-Communities::Sequelize logging");
              }
            },
      benchmark: process.env.NODE_ENV === "development",
      pool: {
        max: 8,
        min: 2,
        idle: 3000,
        acquire: 12000
      },
      isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ
    };

    _db = new Sequelize(db_config);

    await _db.authenticate();

    if (logger !== undefined) {
      logger.info(
        "Search-Communities::DB connection has been established successfully."
      );
    } else {
      console.info(
        "Search-Communities::DB connection has been established successfully."
      );
    }

    await _db.createSchema(schema);

    _schema = schema;

    return _db;
  } catch (error) {
    if (logger !== undefined) {
      logger.error(
        error,
        "Search-Communities::Unable to connect to the database:"
      );
    } else {
      console.error(
        error,
        "Search-Communities::Unable to connect to the database:"
      );
    }
  }
}
