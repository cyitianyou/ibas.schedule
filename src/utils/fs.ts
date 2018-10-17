
import * as fs from "fs";
export async function readdir(path: fs.PathLike): Promise<string[]> {
    return new Promise<string[]>(resolve => {
        fs.readdir(path, (err, files) => {
            if (!!err) {
                resolve([]);
            } else {
                resolve(files);
            }
        });
    });
}