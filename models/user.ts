import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  HasOneGetAssociationMixin
} from "sequelize";
import sequelize from "./indexModel";

import Student from "./student"
import Faculty from "./faculty"

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id:CreationOptional<string>;
  declare email: string;
  declare password: string;
  declare isStudent: boolean;
  declare isFaculty: boolean;
  declare name: string;
  declare phoneNo: string;
  declare dob: Date;
  declare address: string;
  declare gender: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare getStudent: HasOneGetAssociationMixin<Student>;
  declare getFaculty: HasOneGetAssociationMixin<Faculty>;
  // declare Student?: NonAttribute<Student>;
  // declare Faculty?: NonAttribute<Faculty>;
}
User.init(
  {
    id: {
      type:DataTypes.UUID,
      primaryKey:true,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isStudent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isFaculty: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender:{
      type:DataTypes.STRING,
      allowNull:false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  { sequelize }
);

export default User;
