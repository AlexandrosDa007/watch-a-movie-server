import { Injectable } from '@angular/core';
type Path = "home" | "appData" | "userData" | "cache" | "temp" | "exe" | "module" | "desktop" | "documents" | "downloads" | "music" | "pictures" | "videos" | "recent" | "logs" | "crashDumps";
// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame } from 'electron';
import * as remote from '@electron/remote';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;
  app: Electron.App;
  path: any;

  metadata$ = new BehaviorSubject<{ movies: Record<string, Movie> }>(null);
  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  constructor() {
    // Conditional imports
    if (this.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;

      this.path = window.require('path');
      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');

      // If you want to use a NodeJS 3rd party deps in Renderer process (like @electron/remote),
      // it must be declared in dependencies of both package.json (in root and app folders)
      // If you want to use remote object in renderer process, please set enableRemoteModule to true in main.ts
      this.remote = window.require('@electron/remote');
      this.app = this.remote.app;
      console.log(this.remote);
      console.log();
      console.log('remote - globalShortcut', this.remote.globalShortcut);
      this.metadata$.next(this.getMetadata());
    }
  }

  /**
   * Retrieves a path from electron app
   * @param path The path you want to get
   */
  getPath(path: Path): string {
    return this.app.getPath(path);
  }

  getMetadata(): any {
    const userDataPath = this.getPath('appData');
    const metadataPath = this.path.join(userDataPath, 'watch-a-movie-backend', 'configurations.json');
    try {
      const json = this.fs.readFileSync(metadataPath, 'utf-8');
      const metadata = JSON.parse(json);
      return metadata;
    } catch (error) {
      console.error(error);
      this.fs.writeFileSync(metadataPath, JSON.stringify({}));
      return {};
    }
  }

  saveMetadata(metadata: any): boolean {
    const userDataPath = this.getPath('appData');
    const metadataPath = this.path.join(userDataPath, 'watch-a-movie-backend', 'configurations.json');
    const json = JSON.stringify(metadata, undefined, 2);
    try {
      this.fs.writeFileSync(metadataPath, json);
      this.metadata$.next(metadata);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  updateMovie(movieId: string, movie: Movie): void {
    const metadata = this.metadata$.value;
    if (!metadata.movies) {
      metadata.movies = {};
    }
    if (!movie) {
      delete metadata.movies[movieId];
    } else {
      metadata.movies[movie.id] = movie;
    }
    this.saveMetadata(metadata);
  }

}
