import { Movie } from "./movie";

export interface Metadata {
    movies: Record<string, Movie>;
}
