export declare const currentConfig: {
    database: {
        mongo: {
            username: string;
            password: string;
            uri: string;
            database: string;
        };
    };
    app: {
        port: string;
        host: string;
    };
};
export * from './env.validation';
export * from './mongoose.config';
