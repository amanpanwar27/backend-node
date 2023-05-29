import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";

import sequelize from "./indexModel";

class Subject extends Model<InferAttributes<Subject>, InferCreationAttributes<Subject>> {
  declare name: string;
  declare code: string;
  declare credits: number;
  declare lectureHours: number;
  declare tutorialHours: number;
  declare labHours: number;
  declare branch:string;
  declare openElective:boolean;
}

Subject.init(
  {
    code: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    credits: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lectureHours: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    tutorialHours: {
      type: DataTypes.NUMBER,
      allowNull:false
    },
    labHours: {
      type: DataTypes.NUMBER,
      allowNull:false
    },
    branch: {
      type: DataTypes.STRING,
    },
    openElective:{
        type:DataTypes.BOOLEAN
    }
  },
  { sequelize }
);

export default Subject;
