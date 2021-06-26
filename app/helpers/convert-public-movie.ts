import { Movie } from "../models/metadata";
import { PublicMovie } from "../models/public-metadata";

/**
 * Removes some properties from a movie
 * and returns it
 * @param movie The movie object
 */
export function convertPublicMovie(movie: Movie): PublicMovie {
    return {
        id: movie.id,
        airDate: movie.airDate,
        duration: movie.duration,
        title: movie.title,
    } as PublicMovie;
}
