import {DataTypes, Model} from "sequelize";
import {sequelizeInstance} from "./sequelizeInstance";
import {Student} from "./Student";
import {Course} from "./Course";

export class Enrollment extends Model{

}
Enrollment.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Student,
            key: 'id'
        },
        unique: "unique_student_course"
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Course,
            key: 'id'
        },
        unique: "unique_student_course"
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: sequelizeInstance,
    modelName: 'Enrollment',
    tableName: 'enrollments',
    timestamps: false
});
