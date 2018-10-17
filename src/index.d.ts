// tslint:disable:interface-name
declare namespace NodeJS {
    interface Global {
        document: Document;
        window: Window;
        $: any;
        jQuery: any;
    }
}
declare interface Window {
    require: any;
    _schedule: any;
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
    /** 日志文件夹 */
    logDir: string;
}