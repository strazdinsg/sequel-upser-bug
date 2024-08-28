import {DataTypes, Model} from "sequelize";
import {sequelizeInstance} from "./sequelizeInstance";

export class Course extends Model {
}

Course.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: sequelizeInstance,
    modelName: 'Course',
    tableName: 'courses',
    timestamps: false
});
