import express from 'express';
import { readFileSync } from 'fs';
import { getMeta } from '../helpers/get-meta';

/**
 * Retrieves the subtitle file for a movie
 * @param req Express request
 * @param res Express response
 */
export function getMovieSubtitles(req: express.Request, res: express.Response) {
    const id = req.params.id;
    const metadata = getMeta();
    const movie = metadata.movies[id];
    if (!movie){
        return res.status(400).send('This movie does not exists!');
    }

    const subsPath = movie.subsPath;
    if (!subsPath) {
        return res.status(400).send('');
    }
    try {
        const subs = readFileSync(subsPath, 'utf-8');
        return res.send(subs);
    } catch (error) {
        console.error(error);
        return res.status(501).send('Something went wrong!');
    }
}
