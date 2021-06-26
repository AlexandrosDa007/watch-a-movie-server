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
