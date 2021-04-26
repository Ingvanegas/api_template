  
import mysql from 'mysql2/promise';

export class database {
    public init(configs) {
        return mysql.createPool({
            host: process.env.MYSQL_HOST || configs.host,
            user: process.env.MYSQL_USER || configs.user,
            password: configs.password,
            connectionLimit: process.env.MYSQL_CONNECTION_LIMIT || configs.connectionLimit,
            database: configs.database,
            port: 3306,
            debug: configs.debug
        });
    };
}
