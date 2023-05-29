import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey
} from "sequelize";

import sequelize from "./indexModel";
import Student from "./student"
// import Mul

class StudentLeave extends Model<
  InferAttributes<StudentLeave>,
  InferCreationAttributes<StudentLeave>
> {
  declare id: CreationOptional<string>;
  declare startDate: Date;
  declare endDate: Date;
  declare workingDays: number;
  declare reason: string;
  declare placeOfStay: string;
  declare fileDocument: Express.Multer.File | undefined;
  declare advisorCode: string;
  declare advisorApproval: boolean;
  declare wardenApproval: boolean;
  declare StudentId: ForeignKey<Student["id"]>;
}
StudentLeave.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    workingDays: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    reason: {
      type: DataTypes.TEXT,
    },
    placeOfStay: {
      type: DataTypes.TEXT,
    },
    fileDocument: {
      type: DataTypes.JSON,
    },
    advisorCode: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Faculties",
        key: "facultyId",
      },
    },
    // status: {
    //     type: DataTypes.INTEGER,
    //     defaultValue: 0
    //     //  0 -> pending
    //     //  1 -> advisor approved
    //     //  2 -> warden approved
    //     // -1 -> rejected
    // },
    advisorApproval: {
      type: DataTypes.BOOLEAN,
      defaultValue: null,
    },
    wardenApproval: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: "StudentLeave",
  }
);

export default StudentLeave;
