
import * as fs from "fs";
import { createReadStream } from "fs";
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
export async function stat(path: fs.PathLike): Promise<fs.Stats> {
    return new Promise<fs.Stats>(resolve => {
        fs.stat(path, (err, stats) => {
            if (!!err) {
                resolve(null);
            } else {
                resolve(stats);
            }
        });
    });
}
export { createReadStream };