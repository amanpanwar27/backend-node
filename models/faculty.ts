import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from "sequelize";

import sequelize from "./indexModel";
import User from "../models/user"

class Faculty extends Model<InferAttributes<Faculty>, InferCreationAttributes<Faculty>> {
  declare id: string;
  declare department: string;
  declare designation: string;
  declare qualification: string;
  declare isWarden: boolean;
  declare isHod: boolean;
  declare isDean: boolean;
  declare UserId: ForeignKey<User["id"]>;
}

Faculty.init(
  {
    id: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qualification: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isWarden: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isHod: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isDean: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  },
  { sequelize }
);

export default Faculty;
