
import express from 'express';
import { convertPublicMovie } from '../helpers/convert-public-movie';
import { getMeta } from '../helpers/get-meta';
import { Metadata } from '../models/metadata';
import { PublicMetadata } from '../models/public-metadata';

export function getMetadata(req: express.Request, res: express.Response) {
    const metadata: Metadata = getMeta();
    const publicMetadata: PublicMetadata = {
        movies: {},
    };
    // Clear out private properties
    Object.keys(metadata.movies || {}).forEach(movieId => {
        const movie = metadata.movies[movieId];
        const pMovie = convertPublicMovie(movie);
        publicMetadata.movies[pMovie.id] = pMovie;
    });

    return res.json(publicMetadata);
}

