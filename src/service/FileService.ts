/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
import Service from "./Service";
import { DataConverter4js, IDataConverter } from "./DataConverter";
export default class FileService extends Service implements IFileService {
    protected get converter(): IDataConverter {
        return new DataConverter4js();
    }
}
export interface IFileService {

}