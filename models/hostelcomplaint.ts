import { Model, DataTypes, CreationOptional } from "sequelize";
import sequelize from "./indexModel";

class HostelComplaint extends Model {
  declare id: CreationOptional<string>;
  declare complainant: number;
  declare type_of_complaint : string
  declare level: number;
  declare status: string;
  declare description: string;
  declare rejection_note: CreationOptional<string>;
  declare reg_date : string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

HostelComplaint.init(
{
  id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
  },
  complainant: {
      type: DataTypes.INTEGER,
      references: {
        model: "Students",
        key: "studentId",
      }
  },
  type_of_complaint :{
    type:DataTypes.STRING,
  },
  level : {
    type:DataTypes.NUMBER,
    defaultValue:0
},
  status:{
      type:DataTypes.STRING,
      defaultValue:"pending"
  },
  description:{
    type:DataTypes.STRING
  },
  rejection_note:{
      type:DataTypes.STRING,
      defaultValue:null
  },
 
  reg_date:{
    type:DataTypes.STRING
  }
  },
  { sequelize }
);

export default HostelComplaint;
