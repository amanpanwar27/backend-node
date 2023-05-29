import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  ForeignKey,
  CreationOptional,
} from "sequelize";

import sequelize from "./indexModel";
import Faculty from "./faculty"

class FacultyLeave extends Model<
  InferAttributes<FacultyLeave>,
  InferCreationAttributes<FacultyLeave>
> {
  declare id: number;
  declare FacultyId: ForeignKey<Faculty["id"]>;
  declare startDate: Date;
  declare endDate: Date;
  declare reason: string;
  declare type: string;
  declare remarks: string;
  declare status: number;
  declare toCount: boolean;
  declare fileDocument: Express.Multer.File | undefined;
  declare workArrangement: ForeignKey<Faculty["id"]>;
  declare addrDuringLeave: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}
FacultyLeave.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reason: {
      type: DataTypes.TEXT,
    },
    remarks: {
      type: DataTypes.TEXT,
    },
    addrDuringLeave: {
      type: DataTypes.TEXT,
    },
    fileDocument: {
      type: DataTypes.JSON,
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      //  0 -> pending
      //  1 -> hod approved
      //  2 -> dean approved
      // -1 -> rejected
    },
    workArrangement:{
      type:DataTypes.UUID,
      references:{
        model:Faculty,
        key:"id"
      }
    },
    toCount: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  { sequelize }
);

export default FacultyLeave;
