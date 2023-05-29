import { Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey, BelongsToMany, NonAttribute } from "sequelize";

import sequelize from "./indexModel";
import Subject from "./subject";

export class Semester extends Model<InferAttributes<Semester>, InferCreationAttributes<Semester>> {
    declare name: string;
    declare year: string;
    declare number: number;
    declare cousres: NonAttribute<Course[]>;
    declare cgpa: number
}

Semester.init(
    {
        name: {
            type: DataTypes.STRING,
            unique: true,
            primaryKey: true,
        },
        year: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cgpa: {
            type: DataTypes.NUMBER,
            defaultValue:0,
        }
    },
    { sequelize }
);

export class Course extends Model<InferAttributes<Course>, InferCreationAttributes<Course>> {
    declare SubjectId: ForeignKey<Subject["code"]>;
    declare marks: number;
}

Course.init(
    {
        marks:{
            type:DataTypes.NUMBER,
            defaultValue:0,
        }
    },
    {sequelize}
)