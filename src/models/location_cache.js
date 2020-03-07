import { DataTypes } from "sequelize";

import { connect_db, get_db, get_schema } from "../utils/db";

let LocationCache = null;

export async function get_location_cache_model(
  host,
  port,
  username,
  password,
  schema,
  database,
  logging,
  logger
) {
  if (LocationCache !== null) {
    return LocationCache;
  }

  const db = await connect_db(
    host,
    port,
    username,
    password,
    schema,
    database,
    logging,
    logger
  );

  LocationCache = db.define(
    "LocationCache",
    {
      cache_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
      },
      location_id: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: { type: DataTypes.TEXT, allowNull: true },
      latitude_num: { type: DataTypes.DOUBLE(10, 6), allowNull: false },
      longitude_num: { type: DataTypes.DOUBLE(10, 6), allowNull: false },
      latitude_raw_str: { type: DataTypes.TEXT, allowNull: true },
      longitude_raw_str: { type: DataTypes.TEXT, allowNull: true },
      raw_content: { type: DataTypes.JSON, allowNull: false },
      should_be_deleted_when: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      freezeTableName: true,
      tableName: "location_cache",
      modelName: "LocationCache",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
      deletedAt: false,
      underscored: true,
      sequelize: get_db(),
      schema: get_schema()
    }
  );

  return LocationCache;
}
