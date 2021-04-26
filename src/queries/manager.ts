export class Manager {

    database;

    constructor(database) {
        this.database = database;
    }

    process(conn, data, query) {
        return conn.query(query, [data]);
    }

    async create(data, query) {
        let promises:any[] = [];
        let conn;

        try {

            conn = await this.database.getConnection();
            await conn.query('START TRANSACTION');

            promises.push(this.process(conn, data, query));

            let results = await Promise.all(promises);
            await conn.query('COMMIT');
            await conn.release();

            return results.reduce((acc, r) => {
                return r ? acc + r[0].affectedRows : acc;
            }, 0);
        } catch (error) {
            if (conn != null) {
                await conn.query('ROLLBACK');
            }

            return 0;
        }
    }

    async action(query) {
        let promises:any[] = [];
        let conn;

        try {

            conn = await this.database.getConnection();
            let result = conn.query(query);
            await conn.release();

            return result;
        } catch (error) {
            if (conn != null) {
                await conn.query('ROLLBACK');
            }

            return 0;
        }
    }

    async actionWithParameters(query, params) {
        let promises:any[] = [];
        let conn;

        try {

            conn = await this.database.getConnection();
            let result = conn.query(query, params);
            await conn.release();

            return result;
        } catch (error) {
            if (conn != null) {
                await conn.query('ROLLBACK');
            }

            return 0;
        }
    }


    async get(query) {
        let conn = await this.database.getConnection();
        let res = await conn.execute(query);
        conn.release();
        return res[0];
    }
}