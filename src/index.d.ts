// tslint:disable:interface-name
declare namespace NodeJS {
    interface Global {
        document: Document;
        window: Window;
    }
}
declare interface Window {
    _SeheduleStatus: any;
}
interface Config {
    /** 应用设置 */
    appSettings: AppSettings;
}
interface AppSettings {
    /** 服务端口 */
    port: number;
    /** 自动运行 */
    autoRun: boolean;
    /** 默认ibas地址 */
    url: string;
    /** 默认用户 */
    defaultUser: string;
    /** 默认密码 */
    defaultPassword: string;
}