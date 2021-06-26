import express from 'express';
import { readFileSync } from 'fs';
import { getMeta } from '../helpers/get-meta';

export function getMovieImage(req: express.Request, res: express.Response) {
    const id = req.params.id;
    const metadata = getMeta();
    const movie = metadata.movies[id];

    if (!movie) {
        return res.status(400).send('Movie does not exists!');
    }
    try {
        const image = readFileSync(movie.imagePath, 'binary');
        return res.send(image);
    } catch (error) {
        console.error(error);
        return res.status(501).send('Something went wrong!');
    }
}
