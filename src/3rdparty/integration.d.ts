/// <reference path="ibas.d.ts" />
declare namespace initialfantasy {
    const CONSOLE_ID: string;
    const CONSOLE_NAME: string;
    const CONSOLE_VERSION: string;
    const CONFIG_VALUE_ORGANIZATION_WAY: string;
    const CONFIG_VALUE_OWNERSHIP_WAY: string;
    namespace bo {
        const BO_REPOSITORY_INITIALFANTASY: string;
        const BO_CODE_APPLICATIONCONFIG: string;
        const BO_CODE_APPLICATIONELEMENT: string;
        const BO_CODE_APPLICATIONMODULE: string;
        const BO_CODE_APPLICATIONPLATFORM: string;
        const BO_CODE_BOCRITERIA: string;
        const BO_CODE_BOFILTERING: string;
        const BO_CODE_ORGANIZATION: string;
        const BO_CODE_PRIVILEGE: string;
        const BO_CODE_USER: string;
        const BO_CODE_BOINFORMATION: string;
        const BO_CODE_SYSTEM_VARIABLE: string;
        const BO_CODE_SYSTEM_CONFIG: string;
        const BO_CODE_ROLE: string;
        const BO_CODE_PROJECT: string;
        enum emAssignedType {
            USER = 0,
            ROLE = 1
        }
        enum emFilteringType {
            UNAVAILABLE = 0,
            AVAILABLE = 1
        }
        enum emElementType {
            MODULE = 0,
            FUNCTION = 1,
            APPLICATION = 2,
            SERVICE = 3,
            OTHER = 4
        }
        interface IRole {
            code: string;
            name: string;
            activated: ibas.emYesNo;
        }
    }
}
declare namespace initialfantasy {
    namespace bo {
        interface IApplicationConfig extends ibas.IBOSimple {
            configGroup: string;
            configKey: string;
            configDescription: string;
            configValue: string;
            objectKey: number;
            objectCode: string;
            dataSource: string;
            createDate: Date;
            createTime: number;
            updateDate: Date;
            updateTime: number;
            createActionId: string;
            updateActionId: string;
            logInst: number;
            createUserSign: number;
            updateUserSign: number;
        }
    }
}
declare namespace initialfantasy {
    namespace bo {
        interface IApplicationElement extends ibas.IBOSimple {
            moduleId: string;
            elementId: string;
            elementName: string;
            elementType: emElementType;
            objectKey: number;
            objectCode: string;
            dataSource: string;
            createDate: Date;
            createTime: number;
            updateDate: Date;
            updateTime: number;
            createActionId: string;
            updateActionId: string;
            logInst: number;
            createUserSign: number;
            updateUserSign: number;
        }
    }
}
declare namespace initialfantasy {
    namespace bo {
        interface IApplicationModule extends ibas.IBOSimple {
            moduleId: string;
            platformId: string;
            moduleName: string;
            moduleCategory: string;
            moduleEntry: string;
            activated: ibas.emYesNo;
            objectKey: number;
            objectCode: string;
            dataSource: string;
            createDate: Date;
            createTime: number;
            updateDate: Date;
            updateTime: number;
            createActionId: string;
            updateActionId: string;
            logInst: number;
            createUserSign: number;
            updateUserSign: number;
        }
    }
}
declare namespace initialfantasy {
    namespace bo {
        interface IApplicationPlatform extends ibas.IBOSimple {
            platformId: string;
            platformCode: string;
            platformDescription: string;
            activated: ibas.emYesNo;
            objectKey: number;
            objectCode: string;
            dataSource: string;
            createDate: Date;
            createTime: number;
            updateDate: Date;
            updateTime: number;
            createActionId: string;
            updateActionId: string;
            logInst: number;
            createUserSign: number;
            updateUserSign: number;
        }
    }
}
declare namespace initialfantasy {
    namespace bo {
        interface IBOCriteria extends ibas.IBOSimple {
            applicationId: string;
            name: string;
            assignedType: emAssignedType;
            assigned: string;
            activated: ibas.emYesNo;
            data: string;
            order: number;
            objectKey: number;
            objectCode: string;
            logInst: number;
            series: number;
            dataSource: string;
            createDate: Date;
            createTime: number;
            updateDate: Date;
            updateTime: number;
            createUserSign: number;
            updateUserSign: number;
            createActionId: string;
            updateActionId: string;
            organization: string;
        }
    }
}
declare namespace initialfantasy {
    namespace bo {
        interface IBOFiltering extends ibas.IBOSimple {
            roleCode: string;
            boCode: string;
            activated: ibas.emYesNo;
            filteringType: emFilteringType;
            name: string;
            objectKey: number;
            objectCode: string;
            logInst: number;
            series: number;
            dataSource: string;
            createDate: Date;
            createTime: number;
            updateDate: Date;
            updateTime: number;
            createActionId: string;
            updateActionId: string;
            createUserSign: number;
            updateUserSign: number;
            dataOwner: number;
            organization: string;
            boFilteringConditions: IBOFilteringConditions;
        }
        interface IBOFilteringCondition extends ibas.IBOSimpleLine {
            objectKey: number;
            objectCode: string;
            lineId: number;
            logInst: number;
            dataSource: string;
            createDate: Date;
            createTime: number;
            updateDate: Date;
            updateTime: number;
            createUserSign: number;
            updateUserSign: number;
            createActionId: string;
            updateActionId: string;
            propertyName: string;
            conditionValue: string;
            operation: ibas.emConditionOperation;
            relationship: ibas.emConditionRelationship;
            bracketOpen: number;
            bracketClose: number;
        }
        interface IBOFilteringConditions extends ibas.IBusinessObjects<IBOFilteringCondition> {
            create(): IBOFilteringCondition;
        }
    }
}
declare namespace initialfantasy {
    namespace bo {
        interface IBOInformation extends ibas.IBusinessObject {
            code: string;
            name: string;
            description: string;
            mapped: string;
            objectType: string;
            boPropertyInformations: IBOPropertyInformations;
        }
        interface IBOPropertyInformation extends ibas.IBusinessObject {
            code: string;
            property: string;
            mapped: string;
            description: string;
            dataType: string;
            editType: string;
            editSize: number;
            searched: ibas.emYesNo;
            systemed: ibas.emYesNo;
            authorised: ibas.emAuthoriseType;
            boPropertyValues: IBOPropertyValues;
        }
        interface IBOPropertyInformations extends ibas.IBusinessObjects<IBOPropertyInformation> {
            create(): IBOPropertyInformation;
        }
        interface IBOPropertyValue extends ibas.IBusinessObject {
            code: string;
            property: string;
            value: string;
            description: string;
        }
        interface IBOPropertyValues extends ibas.IBusinessObjects<IBOPropertyValue> {
            create(): IBOPropertyValue;
        }
    }
}
declare namespace initialfantasy {
    namespace bo {
        interface IOrganization extends ibas.IBOMasterData, ibas.IBOUserFields {
            code: string;
            name: string;
            activated: ibas.emYesNo;
            docEntry: number;
            objectCode: string;
            createDate: Date;
            createTime: number;
            updateDate: Date;
            updateTime: number;
            dataSource: string;
            logInst: number;
            series: number;
            createUserSign: number;
            updateUserSign: number;
            createActionId: string;
            updateActionId: string;
        }
    }
}
declare namespace initialfantasy {
    namespace bo {
        interface IPrivilege extends ibas.IBOSimple {
            roleCode: string;
            platformId: string;
            moduleId: string;
            target: string;
            activated: ibas.emYesNo;
            authoriseValue: ibas.emAuthoriseType;
            objectKey: number;
            objectCode: string;
            createDate: Date;
            createTime: number;
            updateDate: Date;
            updateTime: number;
            logInst: number;
            series: number;
            dataSource: string;
            createUserSign: number;
            updateUserSign: number;
            createActionId: string;
            updateActionId: string;
        }
    }
}
declare namespace initialfantasy {
    namespace bo {
        interface IProject extends ibas.IBOMasterData, ibas.IBOUserFields {
            code: string;
            name: string;
            activated: ibas.emYesNo;
            manager: number;
            dataOwner: number;
            organization: string;
            teamMembers: string;
            referenced: ibas.emYesNo;
            deleted: ibas.emYesNo;
            reference1: string;
            reference2: string;
            docEntry: number;
            objectCode: string;
            createDate: Date;
            createTime: number;
            updateDate: Date;
            updateTime: number;
            dataSource: string;
            logInst: number;
            series: number;
            createUserSign: number;
            updateUserSign: number;
            createActionId: string;
            updateActionId: string;
        }
    }
}
declare namespace initialfantasy {
    namespace bo {
        interface IUser extends ibas.IBOMasterData, ibas.IBOUserFields {
            code: string;
            name: string;
            password: string;
            activated: ibas.emYesNo;
            super: ibas.emYesNo;
            mail: string;
            phone: string;
            docEntry: number;
            objectCode: string;
            createDate: Date;
            createTime: number;
            updateDate: Date;
            updateTime: number;
            dataSource: string;
            logInst: number;
            series: number;
            createUserSign: number;
            updateUserSign: number;
            createActionId: string;
            updateActionId: string;
            approvalStatus: ibas.emApprovalStatus;
            dataOwner: number;
            organization: string;
        }
    }
}
declare namespace initialfantasy {
    namespace bo {
        interface IBORepositoryInitialFantasy extends ibas.IBORepositoryApplication {
            upload(caller: ibas.IUploadFileCaller<ibas.FileData>): void;
            download(caller: ibas.IDownloadFileCaller<Blob>): void;
            fetchApplicationConfig(fetcher: ibas.IFetchCaller<bo.IApplicationConfig>): void;
            saveApplicationConfig(saver: ibas.ISaveCaller<bo.IApplicationConfig>): void;
            fetchApplicationElement(fetcher: ibas.IFetchCaller<bo.IApplicationElement>): void;
            saveApplicationElement(saver: ibas.ISaveCaller<bo.IApplicationElement>): void;
            fetchApplicationModule(fetcher: ibas.IFetchCaller<bo.IApplicationModule>): void;
            saveApplicationModule(saver: ibas.ISaveCaller<bo.IApplicationModule>): void;
            fetchApplicationPlatform(fetcher: ibas.IFetchCaller<bo.IApplicationPlatform>): void;
            saveApplicationPlatform(saver: ibas.ISaveCaller<bo.IApplicationPlatform>): void;
            fetchBOCriteria(fetcher: ibas.IFetchCaller<bo.IBOCriteria>): void;
            saveBOCriteria(saver: ibas.ISaveCaller<bo.IBOCriteria>): void;
            fetchBOFiltering(fetcher: ibas.IFetchCaller<bo.IBOFiltering>): void;
            saveBOFiltering(saver: ibas.ISaveCaller<bo.IBOFiltering>): void;
            fetchOrganization(fetcher: ibas.IFetchCaller<bo.IOrganization>): void;
            saveOrganization(saver: ibas.ISaveCaller<bo.IOrganization>): void;
            fetchPrivilege(fetcher: ibas.IFetchCaller<bo.IPrivilege>): void;
            savePrivilege(saver: ibas.ISaveCaller<bo.IPrivilege>): void;
            fetchUser(fetcher: ibas.IFetchCaller<bo.IUser>): void;
            saveUser(saver: ibas.ISaveCaller<bo.IUser>): void;
            fetchBOInformation(fetcher: ibas.IFetchCaller<bo.IBOInformation>): void;
            saveBOInformation(saver: ibas.ISaveCaller<bo.IBOInformation>): void;
            fetchProject(fetcher: ibas.IFetchCaller<bo.IProject>): void;
            saveProject(saver: ibas.ISaveCaller<bo.IProject>): void;
        }
    }
}
declare namespace integration {
    const CONSOLE_ID: string;
    const CONSOLE_NAME: string;
    const CONSOLE_VERSION: string;
    namespace bo {
        const BO_REPOSITORY_INTEGRATION: string;
        const BO_CODE_INTEGRATIONJOB: string;
        enum emActionRelationship {
            AND = 0,
            OR = 1
        }
        const CRITERIA_CONDITION_ALIAS_JOB_NAME: string;
        const CRITERIA_CONDITION_ALIAS_BOCODE: string;
        const CRITERIA_CONDITION_ALIAS_APPLICATION_ID: string;
        const CRITERIA_CONDITION_ALIAS_ACTIVATED: string;
        const CRITERIA_CONDITION_ALIAS_ACTION_ID: string;
        const CRITERIA_CONDITION_ALIAS_PACKAGE: string;
    }
    namespace app {
        interface IIntegrationJobServiceContract {
            jobName: string | bo.IIntegrationJob;
            autoRun?: boolean;
            extraData?: any;
        }
        class IntegrationJobServiceProxy extends ibas.ServiceProxy<IIntegrationJobServiceContract> {
        }
    }
}
declare namespace integration {
    namespace bo {
        interface IAction {
            id: string;
            group: string;
            name: string;
            path: string;
            remark: string;
            activated: boolean;
            configs: ibas.IList<IActionConfig>;
        }
        interface IActionConfig {
            key: string;
            value: any;
            remark: string;
        }
    }
}
declare namespace integration {
    namespace bo {
        interface IIntegrationJob extends ibas.IBOSimple {
            name: string;
            activated: ibas.emYesNo;
            frequency: number;
            boCode: string;
            applicationId: string;
            remarks: string;
            objectKey: number;
            objectCode: string;
            logInst: number;
            series: number;
            dataSource: string;
            createDate: Date;
            createTime: number;
            updateDate: Date;
            updateTime: number;
            createUserSign: number;
            updateUserSign: number;
            createActionId: string;
            updateActionId: string;
            dataOwner: number;
            teamMembers: string;
            organization: string;
            integrationJobActions: IIntegrationJobActions;
        }
        interface IIntegrationJobActions extends ibas.IBusinessObjects<IIntegrationJobAction> {
            create(): IIntegrationJobAction;
        }
        interface IIntegrationJobAction extends ibas.IBOSimpleLine {
            objectKey: number;
            lineId: number;
            objectCode: string;
            logInst: number;
            dataSource: string;
            createDate: Date;
            createTime: number;
            updateDate: Date;
            updateTime: number;
            createUserSign: number;
            updateUserSign: number;
            createActionId: string;
            updateActionId: string;
            relationship: emActionRelationship;
            actionId: string;
            actionName: string;
            actionRemark: string;
            integrationJobActionCfgs: IIntegrationJobActionCfgs;
        }
        interface IIntegrationJobActionCfgs extends ibas.IBusinessObjects<IIntegrationJobActionCfg> {
            create(): IIntegrationJobActionCfg;
        }
        interface IIntegrationJobActionCfg extends ibas.IBOSimpleLine {
            objectKey: number;
            lineId: number;
            objectCode: string;
            logInst: number;
            dataSource: string;
            createDate: Date;
            createTime: number;
            updateDate: Date;
            updateTime: number;
            createUserSign: number;
            updateUserSign: number;
            createActionId: string;
            updateActionId: string;
            actionLineId: number;
            key: string;
            value: string;
            remark: string;
        }
    }
}
declare namespace integration {
    namespace bo {
        interface IBORepositoryIntegration extends ibas.IBORepositoryApplication {
            upload(caller: ibas.IUploadFileCaller<ibas.FileData>): void;
            download(caller: ibas.IDownloadFileCaller<Blob>): void;
            fetchIntegrationJob(fetcher: ibas.IFetchCaller<bo.IIntegrationJob>): void;
            saveIntegrationJob(saver: ibas.ISaveCaller<bo.IIntegrationJob>): void;
            fetchAction(fetcher: IActionFetcher): void;
            toPackageUrl(action: bo.IAction): string;
        }
        interface IActionFetcher extends ibas.IMethodCaller<bo.IAction> {
            criteria: ibas.ICriteria | ibas.ICondition[] | bo.IIntegrationJob | bo.IIntegrationJobAction | bo.IIntegrationJobAction[];
        }
    }
}
declare namespace integration {
    namespace bo {
        class Action implements IAction {
            constructor();
            id: string;
            group: string;
            name: string;
            path: string;
            remark: string;
            activated: boolean;
            configs: ibas.IList<IActionConfig>;
            fullPath(): string;
        }
        class ActionConfig implements IActionConfig {
            key: string;
            value: any;
            remark: string;
        }
    }
}
declare namespace integration {
    namespace bo {
        class IntegrationJob extends ibas.BOSimple<IntegrationJob> implements IIntegrationJob {
            static BUSINESS_OBJECT_CODE: string;
            constructor();
            static PROPERTY_NAME_NAME: string;
            name: string;
            static PROPERTY_ACTIVATED_NAME: string;
            activated: ibas.emYesNo;
            static PROPERTY_FREQUENCY_NAME: string;
            frequency: number;
            static PROPERTY_BOCODE_NAME: string;
            boCode: string;
            static PROPERTY_APPLICATIONID_NAME: string;
            applicationId: string;
            static PROPERTY_REMARKS_NAME: string;
            remarks: string;
            static PROPERTY_OBJECTKEY_NAME: string;
            objectKey: number;
            static PROPERTY_OBJECTCODE_NAME: string;
            objectCode: string;
            static PROPERTY_LOGINST_NAME: string;
            logInst: number;
            static PROPERTY_SERIES_NAME: string;
            series: number;
            static PROPERTY_DATASOURCE_NAME: string;
            dataSource: string;
            static PROPERTY_CREATEDATE_NAME: string;
            createDate: Date;
            static PROPERTY_CREATETIME_NAME: string;
            createTime: number;
            static PROPERTY_UPDATEDATE_NAME: string;
            updateDate: Date;
            static PROPERTY_UPDATETIME_NAME: string;
            updateTime: number;
            static PROPERTY_CREATEUSERSIGN_NAME: string;
            createUserSign: number;
            static PROPERTY_UPDATEUSERSIGN_NAME: string;
            updateUserSign: number;
            static PROPERTY_CREATEACTIONID_NAME: string;
            createActionId: string;
            static PROPERTY_UPDATEACTIONID_NAME: string;
            updateActionId: string;
            static PROPERTY_DATAOWNER_NAME: string;
            dataOwner: number;
            static PROPERTY_TEAMMEMBERS_NAME: string;
            teamMembers: string;
            static PROPERTY_ORGANIZATION_NAME: string;
            organization: string;
            static PROPERTY_INTEGRATIONJOBACTIONS_NAME: string;
            integrationJobActions: IntegrationJobActions;
            protected init(): void;
        }
        class IntegrationJobActions extends ibas.BusinessObjects<IntegrationJobAction, IntegrationJob> implements IIntegrationJobActions {
            create(): IntegrationJobAction;
        }
        class IntegrationJobAction extends ibas.BOSimpleLine<IntegrationJobAction> implements IIntegrationJobAction {
            constructor();
            static PROPERTY_OBJECTKEY_NAME: string;
            objectKey: number;
            static PROPERTY_LINEID_NAME: string;
            lineId: number;
            static PROPERTY_OBJECTCODE_NAME: string;
            objectCode: string;
            static PROPERTY_LOGINST_NAME: string;
            logInst: number;
            static PROPERTY_DATASOURCE_NAME: string;
            dataSource: string;
            static PROPERTY_CREATEDATE_NAME: string;
            createDate: Date;
            static PROPERTY_CREATETIME_NAME: string;
            createTime: number;
            static PROPERTY_UPDATEDATE_NAME: string;
            updateDate: Date;
            static PROPERTY_UPDATETIME_NAME: string;
            updateTime: number;
            static PROPERTY_CREATEUSERSIGN_NAME: string;
            createUserSign: number;
            static PROPERTY_UPDATEUSERSIGN_NAME: string;
            updateUserSign: number;
            static PROPERTY_CREATEACTIONID_NAME: string;
            createActionId: string;
            static PROPERTY_UPDATEACTIONID_NAME: string;
            updateActionId: string;
            static PROPERTY_RELATIONSHIP_NAME: string;
            relationship: emActionRelationship;
            static PROPERTY_ACTIONID_NAME: string;
            actionId: string;
            static PROPERTY_ACTIONNAME_NAME: string;
            actionName: string;
            static PROPERTY_ACTIONREMARK_NAME: string;
            actionRemark: string;
            static PROPERTY_INTEGRATIONJOBACTIONCFGS_NAME: string;
            integrationJobActionCfgs: IntegrationJobActionCfgs;
            protected init(): void;
        }
        class IntegrationJobActionCfgs extends ibas.BusinessObjects<IntegrationJobActionCfg, IntegrationJobAction> implements IIntegrationJobActionCfgs {
            create(): IntegrationJobActionCfg;
        }
        class IntegrationJobActionCfg extends ibas.BOSimpleLine<IntegrationJobActionCfg> implements IIntegrationJobActionCfg {
            constructor();
            static PROPERTY_OBJECTKEY_NAME: string;
            objectKey: number;
            static PROPERTY_LINEID_NAME: string;
            lineId: number;
            static PROPERTY_OBJECTCODE_NAME: string;
            objectCode: string;
            static PROPERTY_LOGINST_NAME: string;
            logInst: number;
            static PROPERTY_DATASOURCE_NAME: string;
            dataSource: string;
            static PROPERTY_CREATEDATE_NAME: string;
            createDate: Date;
            static PROPERTY_CREATETIME_NAME: string;
            createTime: number;
            static PROPERTY_UPDATEDATE_NAME: string;
            updateDate: Date;
            static PROPERTY_UPDATETIME_NAME: string;
            updateTime: number;
            static PROPERTY_CREATEUSERSIGN_NAME: string;
            createUserSign: number;
            static PROPERTY_UPDATEUSERSIGN_NAME: string;
            updateUserSign: number;
            static PROPERTY_CREATEACTIONID_NAME: string;
            createActionId: string;
            static PROPERTY_UPDATEACTIONID_NAME: string;
            updateActionId: string;
            static PROPERTY_ACTIONLINEID_NAME: string;
            actionLineId: number;
            static PROPERTY_KEY_NAME: string;
            key: string;
            static PROPERTY_VALUE_NAME: string;
            value: string;
            static PROPERTY_REMARK_NAME: string;
            remark: string;
            protected init(): void;
        }
    }
}
declare namespace integration {
    namespace bo {
        class DataConverter extends ibas.DataConverter4j {
            parsing(data: any, sign: string): any;
            protected createConverter(): ibas.BOConverter;
            static toMessageType(level: ibas.emMessageLevel): ibas.emMessageType;
        }
        const boFactory: ibas.BOFactory;
        interface IActionClassLoader {
            action: bo.Action;
            onError: (error: Error) => void;
            onCompleted: (clazz: any) => void;
        }
        interface IActionClassCreater extends IActionClassLoader {
            onCompleted: (action: ibas.Action) => void;
        }
        class ActionFactory {
            classOf(caller: IActionClassLoader): void;
            create(caller: IActionClassCreater): void;
        }
        const actionFactory: ActionFactory;
    }
}
declare namespace integration {
    namespace bo {
        class BORepositoryIntegration extends ibas.BORepositoryApplication implements IBORepositoryIntegration {
            protected createConverter(): ibas.IDataConverter;
            upload(caller: ibas.IUploadFileCaller<ibas.FileData>): void;
            download(caller: ibas.IDownloadFileCaller<Blob>): void;
            fetchIntegrationJob(fetcher: ibas.IFetchCaller<bo.IntegrationJob>): void;
            saveIntegrationJob(saver: ibas.ISaveCaller<bo.IntegrationJob>): void;
            fetchAction(fetcher: IActionFetcher): void;
            deleteActionPackage(deleter: IPackageDeleter): void;
            uploadActionPackage(caller: ibas.IUploadFileCaller<bo.Action>): void;
            toUrl(action: bo.Action): string;
            toPackageUrl(action: bo.Action): string;
            downloadCode(caller: ICodeDownloader<Blob>): void;
        }
        interface ICodeDownloader<T> extends ibas.IMethodCaller<T> {
            action: bo.Action;
        }
        interface IPackageDeleter extends ibas.IMethodCaller<any> {
            beDeleted: string;
        }
        class CodeRepositoryDownloadAjax extends ibas.RemoteRepositoryXhr {
            constructor();
            download<T>(method: string, caller: ibas.IMethodCaller<any>): void;
            protected createHttpRequest(method: string, data: any): XMLHttpRequest;
        }
        class BORepositoryIntegrationDevelopment extends ibas.BORepositoryApplication {
            constructor();
            protected createConverter(): ibas.IDataConverter;
            loadActions(loader: IActionsLoader): void;
        }
        interface IActionsLoader extends ibas.IMethodCaller<bo.Action> {
            url: string;
        }
    }
}
declare namespace integration {
    namespace bo {
    }
}
declare namespace integration {
    namespace app {
        class DevelopmentTerminalFunc extends ibas.ModuleFunction {
            static FUNCTION_ID: string;
            static FUNCTION_NAME: string;
            constructor();
            default(): ibas.IApplication<ibas.IView>;
        }
    }
}
declare namespace integration {
    namespace app {
        class DevelopmentTerminalApp extends ibas.Application<IDevelopmentTerminalView> {
            static APPLICATION_ID: string;
            static APPLICATION_NAME: string;
            constructor();
            protected registerView(): void;
            protected viewShowed(): void;
            protected loadActions(url: string): void;
            private usingAction;
            protected useAction(data: bo.Action): void;
            protected runAction(autoRun: boolean): void;
        }
        interface IDevelopmentTerminalView extends ibas.IView {
            loadActionsEvent: Function;
            showActions(datas: bo.Action[]): void;
            useActionEvent: Function;
            showAction(data: bo.Action): void;
            showActionConfigs(datas: bo.ActionConfig[]): void;
            runActionEvent: Function;
        }
    }
}
declare namespace integration {
    namespace app {
        class IntegrationActionChooseApp extends ibas.BOChooseService<IIntegrationActionChooseView, bo.Action> {
            static APPLICATION_ID: string;
            static APPLICATION_NAME: string;
            static BUSINESS_OBJECT_CODE: string;
            constructor();
            protected registerView(): void;
            protected viewShowed(): void;
            protected fetchData(criteria: ibas.ICriteria): void;
            protected newData(): void;
        }
        interface IIntegrationActionChooseView extends ibas.IBOChooseView {
            showData(datas: bo.Action[]): void;
        }
        class IntegrationActionChooseServiceMapping extends ibas.BOChooseServiceMapping {
            constructor();
            create(): ibas.IService<ibas.IBOChooseServiceCaller<bo.Action>>;
        }
    }
}
declare namespace integration {
    namespace app {
        class IntegrationActionListApp extends ibas.Application<IIntegrationActionListView> {
            static APPLICATION_ID: string;
            static APPLICATION_NAME: string;
            constructor();
            protected registerView(): void;
            protected viewShowed(): void;
            protected fetchData(criteria: ibas.ICriteria): void;
            protected uploadActionPackage(formData: FormData): void;
            protected viewCode(data: bo.Action | bo.Action[]): void;
            protected deleteData(data: bo.Action | bo.Action[]): void;
        }
        interface IIntegrationActionListView extends ibas.IBOQueryView {
            uploadActionPackageEvent: Function;
            deleteDataEvent: Function;
            viewCodeEvent: Function;
            showData(datas: bo.Action[]): void;
            showCode(code: Blob): void;
        }
    }
}
declare namespace integration {
    namespace app {
        class IntegrationActionRunnerApp extends ibas.Application<IIntegrationActionRunnerView> {
            static APPLICATION_ID: string;
            static APPLICATION_NAME: string;
            constructor();
            protected registerView(): void;
            protected viewShowed(): void;
            extraData: any;
            autoRun: boolean;
            run(): void;
            run(action: bo.Action | bo.Action[]): void;
            private actions;
            private groupAction;
            private runActions;
            private stopActions;
        }
        interface IIntegrationActionRunnerView extends ibas.IView {
            runActionsEvent: Function;
            stopActionsEvent: Function;
            showActions(datas: bo.Action[]): void;
            showMessages(type: ibas.emMessageType, message: string): void;
        }
    }
}
declare namespace integration {
    namespace app {
        class IntegrationActionFunc extends ibas.ModuleFunction {
            static FUNCTION_ID: string;
            static FUNCTION_NAME: string;
            constructor();
            default(): ibas.IApplication<ibas.IView>;
        }
    }
}
declare namespace integration {
    namespace app {
        class IntegrationJobRunnerApp extends IntegrationActionRunnerApp {
            constructor();
            run(): void;
            run(job: bo.IntegrationJob): void;
            run(action: bo.Action | bo.Action[]): void;
        }
    }
}
declare namespace integration {
    namespace app {
        class IntegrationJobApp extends IntegrationJobRunnerApp {
            static APPLICATION_ID: string;
            static APPLICATION_NAME: string;
            constructor();
            run(): void;
            run(job: bo.IntegrationJob): void;
            run(action: bo.Action | bo.Action[]): void;
            run(proxy: IntegrationJobServiceProxy): void;
            runService(contract: IIntegrationJobServiceContract): void;
        }
        class IntegrationJobAppMapping extends ibas.ServiceMapping {
            constructor();
            create(): ibas.IService<ibas.IServiceContract>;
        }
    }
}
declare namespace integration {
    namespace app {
        class IntegrationJobSchedulerApp extends ibas.ResidentApplication<IIntegrationJobSchedulerView> {
            static APPLICATION_ID: string;
            static APPLICATION_NAME: string;
            constructor();
            protected registerView(): void;
            protected viewShowed(): void;
            protected barShowed(): void;
            private activated;
            private jobs;
            private schedule;
            private reset;
            private suspend;
        }
        interface IIntegrationJobSchedulerView extends ibas.IResidentView {
            showJobs(datas: TaskAction[]): void;
            suspendEvent: Function;
            resetEvent: Function;
        }
        class TaskAction extends ibas.Action {
            job: bo.IntegrationJob;
            lastRunTime: number;
            activated: boolean;
            logger: ibas.ILogger;
            setLogger(logger: ibas.ILogger): void;
            do(): void;
            protected done(): void;
            protected run(): boolean;
            private runActions;
            private actions;
        }
    }
}
declare namespace integration {
    namespace app {
        class IntegrationJobChooseApp extends ibas.BOChooseService<IIntegrationJobChooseView, bo.IntegrationJob> {
            static APPLICATION_ID: string;
            static APPLICATION_NAME: string;
            static BUSINESS_OBJECT_CODE: string;
            constructor();
            protected registerView(): void;
            protected viewShowed(): void;
            protected fetchData(criteria: ibas.ICriteria): void;
            protected newData(): void;
        }
        interface IIntegrationJobChooseView extends ibas.IBOChooseView {
            showData(datas: bo.IntegrationJob[]): void;
        }
        class IntegrationJobChooseServiceMapping extends ibas.BOChooseServiceMapping {
            constructor();
            create(): ibas.IService<ibas.IBOChooseServiceCaller<bo.IntegrationJob>>;
        }
    }
}
declare namespace integration {
    namespace app {
        class IntegrationJobEditApp extends ibas.BOEditApplication<IIntegrationJobEditView, bo.IntegrationJob> {
            static APPLICATION_ID: string;
            static APPLICATION_NAME: string;
            static BUSINESS_OBJECT_CODE: string;
            constructor();
            protected registerView(): void;
            protected viewShowed(): void;
            run(): void;
            run(data: bo.IntegrationJob): void;
            protected editData: bo.IntegrationJob;
            protected editIntegrationJobAction: bo.IntegrationJobAction;
            protected saveData(): void;
            protected deleteData(): void;
            protected createData(clone: boolean): void;
            private addIntegrationJobAction;
            private removeIntegrationJobAction;
            private editJobActionEvent;
            private addIntegrationJobActionCfg;
            private removeIntegrationJobActionCfg;
            private chooseBusinessObject;
            private chooseApplication;
            private chooseJobAction;
            private chooseJobActionCfgConfigItem;
        }
        interface IIntegrationJobEditView extends ibas.IBOEditView {
            showIntegrationJob(data: bo.IntegrationJob): void;
            deleteDataEvent: Function;
            createDataEvent: Function;
            chooseBusinessObjectEvent: Function;
            chooseApplicationEvent: Function;
            addIntegrationJobActionEvent: Function;
            removeIntegrationJobActionEvent: Function;
            editJobActionEvent: Function;
            showIntegrationJobActions(datas: bo.IntegrationJobAction[]): void;
            chooseJobActionEvent: Function;
            addIntegrationJobActionCfgEvent: Function;
            removeIntegrationJobActionCfgEvent: Function;
            showIntegrationJobActionCfgs(datas: bo.IntegrationJobActionCfg[]): void;
            chooseJobActionCfgConfigItemEvent: Function;
        }
    }
}
declare namespace integration {
    namespace app {
        class IntegrationJobFunc extends ibas.ModuleFunction {
            static FUNCTION_ID: string;
            static FUNCTION_NAME: string;
            constructor();
            default(): ibas.IApplication<ibas.IView>;
        }
    }
}
declare namespace integration {
    namespace app {
        class IntegrationJobListApp extends ibas.BOListApplication<IIntegrationJobListView, bo.IntegrationJob> {
            static APPLICATION_ID: string;
            static APPLICATION_NAME: string;
            static BUSINESS_OBJECT_CODE: string;
            constructor();
            protected registerView(): void;
            protected viewShowed(): void;
            protected fetchData(criteria: ibas.ICriteria): void;
            protected newData(): void;
            protected viewData(data: bo.IntegrationJob): void;
            protected editData(data: bo.IntegrationJob): void;
            protected deleteData(data: bo.IntegrationJob | bo.IntegrationJob[]): void;
        }
        interface IIntegrationJobListView extends ibas.IBOListView {
            editDataEvent: Function;
            deleteDataEvent: Function;
            showData(datas: bo.IntegrationJob[]): void;
        }
    }
}
declare namespace integration {
    namespace app {
        class IntegrationJobService extends ibas.ServiceApplication<IIntegrationJobServiceView, ibas.IBOServiceContract> {
            static APPLICATION_ID: string;
            static APPLICATION_NAME: string;
            constructor();
            protected registerView(): void;
            protected viewShowed(): void;
            extraData: any;
            runService(contract: ibas.IBOServiceContract): void;
            protected fetchData(criteria: ibas.ICriteria): void;
            protected runJob(job: bo.IntegrationJob, autoRun: boolean): void;
        }
        interface IIntegrationJobServiceView extends ibas.IView {
            showJobs(datas: bo.IntegrationJob[]): void;
            runJobEvent: Function;
        }
        class IntegrationJobServiceMapping extends ibas.ServiceMapping {
            constructor();
            create(): ibas.IService<ibas.IServiceContract>;
        }
    }
}
declare namespace integration {
    namespace app {
        class Console extends ibas.ModuleConsole {
            constructor();
            private _navigation;
            navigation(): ibas.IViewNavigation;
            protected registers(): void;
            run(): void;
        }
        class ConsolePhone extends Console {
            protected registers(): void;
        }
        class ConsoleDev extends ibas.ModuleConsole {
            constructor();
            private _navigation;
            navigation(): ibas.IViewNavigation;
            protected registers(): void;
            run(): void;
        }
    }
}
