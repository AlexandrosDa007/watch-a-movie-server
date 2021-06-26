import { Movie } from "../models/metadata";
import { PublicMovie } from "../models/public-metadata";

export function convertPublicMovie(movie: Movie): PublicMovie {
    return {
        id: movie.id,
        airDate: movie.airDate,
        duration: movie.duration,
        title: movie.title,
    } as PublicMovie;
}
