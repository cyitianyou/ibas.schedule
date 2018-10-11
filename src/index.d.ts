// tslint:disable:interface-name
interface Config {
    /** 服务设置 */
    serverSettings: ServerSettings;
    /** 应用设置 */
    appSettings: AppSettings;
}
interface ServerSettings {
    /** 服务端口 */
    port: number;
    /** 自动运行 */
    autoRun: boolean;
}
interface AppSettings {
    /** 默认ibas地址 */
    url: string;
    /** 默认用户 */
    defaultUser: string;
    /** 默认密码 */
    defaultPassword: string;
}