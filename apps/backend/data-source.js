"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const path_1 = require("path");
// Load environment variables
(0, dotenv_1.config)({ path: (0, path_1.join)(__dirname, '.env') });
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'rentro_user',
    password: process.env.DB_PASSWORD || 'rentro_password',
    database: process.env.DB_NAME || 'rentro_dev',
    entities: [(0, path_1.join)(__dirname, 'src', 'typeorm', 'entities', '*.entity.{ts,js}')],
    migrations: [(0, path_1.join)(__dirname, 'src', 'database', 'migrations', '*.{ts,js}')],
    synchronize: false,
    logging: process.env.NODE_ENV === 'development',
});
