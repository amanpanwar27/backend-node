import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from "sequelize";
import Faculty from "./faculty";
import sequelize from "./indexModel";

class Research extends Model<
  InferAttributes<Research>,
  InferCreationAttributes<Research>
> {
  declare id: CreationOptional<string>;
  declare researchType: string;
  declare journalISBNNo: string;
  declare authorsName: string;
  declare researchTitle: string;
  declare journalName: string;
  declare publishedYear: number;
  declare volNo: number;
  declare pageNo: number;
  declare researchLink: string;
  declare FacultyId: ForeignKey<Faculty["id"]>;
}

Research.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    researchType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    journalISBNNo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    authorsName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    researchTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    journalName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publishedYear: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    volNo: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    pageNo: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    researchLink: {
      type: DataTypes.STRING,
    },
  },
  { sequelize }
);

export default Research;
