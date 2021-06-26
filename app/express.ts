import express from 'express';
import cors from 'cors';
import { getMovieVideo } from './handlers/get-movie-video';
import { getMovieSubtitles } from './handlers/get-movie-subtitles';
import { getMovieImage } from './handlers/get-movie-image';
import { getMetadata } from './handlers/get-metadata';


export class MyServer {
    instance: any;
    constructor(port?: number) {
        const app = express();
        app.use(cors());
        app.use(express.static('public'));
        app.get('/metadata', getMetadata);
        app.get('/movies/video/:id', getMovieVideo);
        app.get('/movies/subtitles/:id', getMovieSubtitles);
        app.get('/movies/image/:id', getMovieImage);
        this.instance = app.listen(port ?? 3100);
    }

    closeServer() {
        this.instance.close();
    }

    restartServer(port?: number) {
        if (!this.instance.listening) {
            this.instance = express().listen(port ?? 3100);
        }
    }

}

// const server = express().listen('3100');
// server.listening

// export function startServer(): void {
//     expressApp.use(cors());
//     expressApp.use(express.static('public'));


//     expressApp.get('/movies/video/:id', getMovieVideo);

//     expressApp.get('/movies/subtitles/:id', getMovieSubtitles);

//     expressApp.get('/movies/image/:id', getMovieImage);


//     export function closeServer(): void {
//         server.close();
//     }

//     export function restartServer(): void {

//     }