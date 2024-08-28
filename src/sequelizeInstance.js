import {Sequelize} from "sequelize";

export const sequelizeInstance = new Sequelize( {
    dialect: "sqlite",
    storage: ":memory:",
    logging: true
});