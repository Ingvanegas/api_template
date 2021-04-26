import configs from './config.json';

export function getDatabaseConfig() {
    return configs['database'];
}

export function getServerConfig() {
    return configs['server'];
}