import { app } from "electron";
import { readFileSync, writeFileSync } from "fs-extra";
import * as path from "path";
import { Metadata } from "../models/metadata";

export function getMeta(): Metadata {
    const appPath = app.getPath('appData');
    const filePath = path.join(appPath, 'watch-a-movie-backend', 'configurations.json');

    try {
        const json = readFileSync(filePath, 'utf-8');
        const metadata = JSON.parse(json);
        return metadata;
    } catch (error) {
        // If file does not exist create it
        writeFileSync(filePath, JSON.stringify({}));
        return {} as Metadata;
    }
}
