import {sequelizeInstance} from "./sequelizeInstance";
import {DataTypes, Model} from "sequelize";


export class Student extends Model {
}

Student.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: sequelizeInstance,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
});
