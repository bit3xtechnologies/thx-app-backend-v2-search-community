import { DataTypes } from "sequelize";

export async function get_location_cache_model(db, schema) {
  const LocationCache = db.define(
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
      sequelize: db,
      schema,
      indexes: [
        {
          using: "BTREE",
          fields: [{ attribute: "should_be_deleted_when", order: "ASC" }]
        },
        {
          using: "HASH",
          fields: ["location_id"]
        },
        {
          name: "lat_asc",
          using: "BTREE",
          fields: [{ attribute: "latitude_num", order: "ASC" }]
        },
        {
          name: "long_asc",
          using: "BTREE",
          fields: [{ attribute: "longitude_num", order: "ASC" }]
        },
        {
          name: "lat_desc",
          using: "BTREE",
          fields: [{ attribute: "latitude_num", order: "DESC" }]
        },
        {
          name: "long_desc",
          using: "BTREE",
          fields: [{ attribute: "longitude_num", order: "DESC" }]
        },
        {
          name: "cache_id_desc_idx_x",
          using: "BTREE",
          fields: [{ attribute: "cache_id", order: "DESC" }]
        },
        {
          name: "cache_id_asc_idx_x",
          using: "BTREE",
          fields: [{ attribute: "cache_id", order: "ASC" }]
        },
        {
          name: "should_be_deleted_when_asc",
          using: "BTREE",
          fields: [{ attribute: "should_be_deleted_when", order: "ASC" }]
        }
      ]
    }
  );

  if (process.env.DB_SYNC_FORCE === true) {
    await LocationCache.sync({ force: true });
  } else {
    await LocationCache.sync({ force: false });
  }

  return LocationCache;
}
