
import { Server } from './server';
import * as configs from './config';
import { database } from './database';

// Catch unhandling unexpected exceptions
process.on('uncaughtException', (error) => {
    console.error(`uncaughtException ${error.message}`);
});

// Catch unhandling rejected promises
process.on('unhandledRejection', (reason) => {
    console.error(`unhandledRejection ${reason}`);
});

const dbConfig = configs.getDatabaseConfig();
const db = new database().init(dbConfig);

const serverConfig = configs.getServerConfig();
const app = new Server().init(serverConfig, db);

app.listen(process.env.PORT || serverConfig.port, () => {
    console.log('Server running at:', serverConfig.port);
}).on('error', (e)=> console.error('\x1b[31m',`An error occurred while running the process at the port ${process.env.PORT} please try using another port`));