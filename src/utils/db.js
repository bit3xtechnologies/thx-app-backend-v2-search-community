import { Sequelize, Transaction } from "sequelize";

export async function connect_db({
  host,
  port,
  username,
  password,
  schema,
  database,
  logging,
  logger
}) {
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
        logging === true
          ? (...args) => {
              if (logger !== undefined) {
                logger.info(args[0], "#Sequelize logging");
              } else {
                console.info(args[0], "#Sequelize logging");
              }
            }
          : false,
      benchmark: process.env.NODE_ENV === "development",
      pool: {
        max: 4,
        min: 2,
        idle: 3000,
        acquire: 12000
      },
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
    };

    const _db = new Sequelize(db_config);

    await _db.authenticate();

    if (logger !== undefined) {
      logger.info("#DB connection has been established successfully.");
    } else {
      console.info("#DB connection has been established successfully.");
    }

    await _db.createSchema(schema);

    return _db;
  } catch (error) {
    if (logger !== undefined) {
      logger.error(error, "#Unable to connect to the database:");
    } else {
      console.error(error, "#Unable to connect to the database:");
    }

    throw error;
  }
}
