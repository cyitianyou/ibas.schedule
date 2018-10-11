/// <reference path="crypto-js.d.ts" />
/// <reference path="ibas.d.ts" />
declare namespace shell {
    const CONSOLE_ID: string;
    const CONSOLE_NAME: string;
    const CONSOLE_VERSION: string;
    namespace bo {
        const BO_REPOSITORY_SHELL: string;
        const BO_REPOSITORY_CONNECT: string;
    }
}
declare namespace shell {
    namespace bo {
        interface IUser {
            id: number;
            code: string;
            name: string;
            super: boolean;
            token: string;
            belong: string;
        }
        interface IUserModule {
            id: string;
            name: string;
            index: string;
            console: string;
            category: string;
            address: string;
            repository: string;
            authorise: ibas.emAuthoriseType;
            runtime: string;
        }
        interface IUserPrivilege {
            source: ibas.emPrivilegeSource;
            target: string;
            value: ibas.emAuthoriseType;
        }
        interface IUserQuery {
            id: string;
            name: string;
            criteria: ibas.ICriteria;
            order: number;
        }
        interface IBOInfo {
            name: string;
            code: string;
            type: string;
            properties: Array<IBOPropertyInfo>;
        }
        interface IBOPropertyInfo {
            property: string;
            description: string;
            searched: boolean;
            values: Array<IBOPropertyValue>;
        }
        interface IBOPropertyValue {
            value: string;
            description: string;
        }
    }
}
declare namespace shell {
    namespace bo {
        interface IConnectCaller extends ibas.IMethodCaller<IUser> {
        }
        interface IUserConnectCaller extends IConnectCaller {
            user: string;
            password: string;
        }
        interface ITokenConnectCaller extends IConnectCaller {
            token: string;
        }
        interface IUserMethodCaller<P> extends ibas.IMethodCaller<P> {
            user: string;
            platform?: string;
        }
        interface IUserQueriesCaller extends IUserMethodCaller<IUserQuery> {
            queryId: string;
        }
        interface IBOInfoCaller extends ibas.IMethodCaller<IBOInfo> {
            boName: string;
            boCode: string;
            onCompleted(opRslt: ibas.IOperationResult<IBOInfo>): void;
        }
        interface IBORepositoryConnect {
            address: string;
            userConnect(caller: IUserConnectCaller): void;
            tokenConnect(caller: ITokenConnectCaller): void;
        }
        interface IBORepositoryShell extends IBORepositoryConnect {
            fetchUserModules(caller: IUserMethodCaller<IUserModule>): void;
            fetchUserPrivileges(caller: IUserMethodCaller<IUserPrivilege>): void;
            fetchUserQueries(caller: IUserQueriesCaller): void;
            saveUserQuery(caller: ibas.ISaveCaller<IUserQuery>): void;
            fetchBOInfos(caller: IBOInfoCaller): void;
        }
    }
}
declare namespace shell {
    namespace bo {
        class User implements IUser {
            id: number;
            code: string;
            name: string;
            super: boolean;
            token: string;
            belong: string;
        }
        class UserModule implements IUserModule {
            id: string;
            name: string;
            index: string;
            console: string;
            category: string;
            address: string;
            repository: string;
            authorise: ibas.emAuthoriseType;
            runtime: string;
        }
        class UserPrivilege implements IUserPrivilege {
            source: ibas.emPrivilegeSource;
            target: string;
            value: ibas.emAuthoriseType;
        }
        class UserQuery implements IUserQuery {
            id: string;
            name: string;
            criteria: ibas.ICriteria;
            order: number;
            target: string;
            user: string;
        }
        class BOInfo implements IBOInfo {
            name: string;
            code: string;
            type: string;
            properties: Array<BOPropertyInfo>;
        }
        class BOPropertyInfo implements IBOPropertyInfo {
            property: string;
            description: string;
            searched: boolean;
            editable: boolean;
            values: Array<BOPropertyValue>;
        }
        class BOPropertyValue implements IBOPropertyValue {
            value: string;
            description: string;
        }
    }
}
declare namespace shell {
    namespace bo4j {
        interface IDataDeclaration {
            type: string;
        }
        interface IUser extends IDataDeclaration {
            Id: number;
            Code: string;
            Name: string;
            Super: boolean;
            Token: string;
            Belong: string;
            Password?: string;
        }
        interface IUserModule extends IDataDeclaration {
            Id: string;
            Name: string;
            Category: string;
            Console: string;
            Address: string;
            Repository: string;
            Index: string;
            Authorise: string;
            Runtime: string;
        }
        interface IUserPrivilege extends IDataDeclaration {
            Source: string;
            Target: string;
            Value: string;
        }
        interface IUserQuery extends IDataDeclaration {
            Id: string;
            Name: string;
            Criteria: string;
            Order: number;
            User: string;
        }
        interface IBOInfo extends IDataDeclaration {
            Name: string;
            Code: string;
            Type: string;
            Properties: IBOPropertyInfo[];
        }
        interface IBOPropertyInfo extends IDataDeclaration {
            Property: string;
            Description: string;
            Searched: boolean;
            Editable: boolean;
            Values: IBOPropertyValue[];
        }
        interface IBOPropertyValue extends IDataDeclaration {
            Value: string;
            Description: string;
        }
    }
}
declare namespace shell {
    namespace bo {
        class DataConverter extends ibas.DataConverter4j {
            createConverter(): ibas.IBOConverter<ibas.IBusinessObject, any>;
            convert(data: any, sign: string): any;
            parsing(data: any, sign: string): any;
        }
        const boFactory: ibas.BOFactory;
    }
}
declare namespace shell {
    namespace bo {
        namespace repository {
            function create(): IBORepositoryShell;
        }
    }
}
declare namespace shell {
    namespace bo {
    }
}
declare namespace shell {
    namespace app {
        const CONFIG_ITEM_APPLICATION_NAME: string;
        class MainApp extends ibas.Application<IMainView> {
            static APPLICATION_ID: string;
            static APPLICATION_NAME: string;
            constructor();
            protected registerView(): void;
            protected viewShowed(): void;
        }
        interface IMainView extends ibas.IView {
        }
    }
}
declare namespace shell {
    namespace app {
        class LoginApp extends ibas.Application<ILoginView> {
            static APPLICATION_ID: string;
            static APPLICATION_NAME: string;
            constructor();
            protected registerView(): void;
            protected viewShowed(): void;
            changeLanguage(): void;
            run(): void;
            private login;
            private onConnectCompleted;
        }
        interface ILoginView extends ibas.IView {
            user: string;
            password: string;
            loginEvent: Function;
            displayLanguages(list: string[]): void;
            changeLanguageEvent: Function;
            language: string;
        }
    }
}
declare namespace shell {
    namespace app {
        class AboutApp extends ibas.Application<IAboutView> {
            static APPLICATION_ID: string;
            static APPLICATION_NAME: string;
            constructor();
            protected registerView(): void;
            protected viewShowed(): void;
        }
        class Component {
            constructor(name: string, version: string);
            constructor(name: string, version: string, copyright: string);
            constructor(name: string, version: string, copyright: string, icon: string);
            name: string;
            version: string;
            copyright: string;
            icon: string;
        }
        class ModuleMonitor {
            static RUNTIME_INFORMATION_MAX_MEMORY: string;
            static RUNTIME_INFORMATION_TOTAL_MEMORY: string;
            static RUNTIME_INFORMATION_FREE_MEMORY: string;
            static RUNTIME_INFORMATION_USED_MEMORY: string;
            monitor(caller: IModuleMonitorCaller): void;
        }
        interface IModuleMonitorCaller extends ibas.IMethodCaller<any> {
            name: string;
        }
        interface IAboutView extends ibas.IView {
            showLibraries(components: ibas.IList<Component>): void;
            showApplications(components: ibas.IList<Component>): void;
        }
    }
}
declare namespace shell {
    namespace app {
        const CONFIG_ITEM_HELP_URL: string;
        const CONFIG_ITEM_HELP_INSIDE: string;
        class HelpApp extends ibas.Application<IHelpView> {
            static APPLICATION_ID: string;
            static APPLICATION_NAME: string;
            constructor();
            protected registerView(): void;
            protected viewShowed(): void;
            run(): void;
        }
        interface IHelpView extends ibas.IUrlView {
        }
    }
}
declare namespace shell {
    namespace app {
        class CenterApp extends ibas.AbstractApplication<ICenterView> {
            static APPLICATION_ID: string;
            static APPLICATION_NAME: string;
            constructor();
            show(view: ibas.IView): void;
            show(): void;
            private afterViewShow;
            protected registerView(): void;
            run(): void;
            run(user: bo.IUser): void;
            protected viewShowed(): void;
            private help;
            private about;
            private currentUser;
            private init;
            private functionMap;
            private activateFunction;
            close(): void;
            destroy(): void;
            busy(view: ibas.IView, busy: boolean, msg: string): any;
            proceeding(view: ibas.IView, type: ibas.emMessageType, msg: string): any;
            messages(caller: ibas.IMessgesCaller): any;
            showView(view: ibas.IView): void;
        }
        interface ICenterView extends ibas.IView {
            helpEvent: Function;
            aboutEvent: Function;
            activateFunctionEvent: Function;
            destroyView(view: ibas.IView): void;
            showView(view: ibas.IView): void;
            busyView(view: ibas.IView, busy: boolean, msg: string): any;
            showStatusMessage(type: ibas.emMessageType, message: string): void;
            showMessageBox(caller: ibas.IMessgesCaller): void;
            showModule(console: ibas.IModuleConsole): void;
            showModuleFunction(module: string, func: ibas.IModuleFunction): void;
            showResidentView(view: ibas.IBarView): void;
        }
        interface IUserPrivilegeLoader {
            user: string;
            platform: string;
            onError(error: Error): void;
            onCompleted(): void;
        }
        class UserPrivilegeManager {
            canRun(element: ibas.IElement): boolean;
            load(loader: IUserPrivilegeLoader): void;
        }
        const privilegeManager: UserPrivilegeManager;
        interface IModuleConsoleLoader {
            user: string;
            platform: string;
            onStatusMessage(type: ibas.emMessageType, message: string): void;
            onError(error: Error): void;
            onCompleted(console: ibas.ModuleConsole): void;
        }
        class ModuleConsoleManager {
            modules(): ibas.IModule[];
            load(loader: IModuleConsoleLoader): void;
        }
        const consoleManager: ModuleConsoleManager;
    }
}
declare namespace shell {
    namespace app {
        class QueryPanel extends ibas.BarApplication<IQueryPanelView> {
            static APPLICATION_ID: string;
            static APPLICATION_NAME: string;
            constructor();
            protected init(callBack: Function): void;
            protected registerView(): void;
            protected viewShowed(): void;
            protected barShowed(): void;
            private showQueries;
            private editQuery;
            private deleteQuery;
            private saveQuery;
            private addQueryCondition;
            private removeQueryCondition;
            run(): void;
            run(callBack: Function): void;
            protected listener: ibas.IUseQueryPanel;
            register(listener: ibas.IUseQueryPanel): void;
            protected readonly targetName: string;
            protected queries: ibas.ArrayList<bo.IUserQuery>;
            protected currentQuery(): bo.IUserQuery;
            protected currentCriteria(): ibas.ICriteria;
            private search;
            private fireQuery;
        }
        interface IQueryPanelView extends ibas.IBarView {
            searchEvent: Function;
            searchContent: string;
            usingQuery: string;
            drawPuller(): any;
            showQueries(datas: ibas.KeyValue[]): void;
            deleteQueryEvent: Function;
            saveQueryEvent: Function;
            showQuery(data: bo.UserQuery): void;
            showQueryConditions(datas: ibas.ICondition[]): void;
            addQueryConditionEvent: Function;
            removeQueryConditionEvent: Function;
        }
    }
}
declare namespace shell {
    namespace app {
        class CenterFunc extends ibas.ModuleFunction {
            constructor(viewShower: ibas.IViewShower);
            viewShower: ibas.IViewShower;
            default(): ibas.IApplication<ibas.IView>;
        }
    }
}
declare namespace shell {
    namespace app {
        class Console extends ibas.ModuleConsole {
            static ROOT_FILE_NAME: string;
            constructor();
            viewShower: ibas.IViewShower;
            private _navigation;
            navigation(): ibas.IViewNavigation;
            protected registers(): void;
            run(): void;
        }
    }
}
