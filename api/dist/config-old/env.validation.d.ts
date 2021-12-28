declare enum Environment {
    Development = "development",
    Production = "production",
    Test = "test",
    Provision = "provision"
}
declare class EnvironmentVariables {
    MODE: Environment;
    SERVER_PORT: number;
    MONGO_PORT: string;
    MONGO_URL: string;
    DB_HOST: string;
    DB_PORT: number;
    DB_USERNAME?: string;
    DB_PASSWORD: string;
    DB: string;
}
export declare function validate(config: Record<string, unknown>): EnvironmentVariables;
export {};
