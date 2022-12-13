import { Sequelize } from 'sequelize';

const db: Sequelize = new Sequelize('node-ts', 'root', '', {
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: true
});

export default db;