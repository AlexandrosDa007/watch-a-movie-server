import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from '../models/movie';
import { ElectronService } from './electron.service';

@Injectable({
    providedIn: 'root'
})
export class MoviesService {
    constructor(
        private electronService: ElectronService,
    ) { }

    /**
     * Retrieves the movies from metadata
     */
    getMovies(): Observable<Movie[]> {
        return this.electronService.metadata$.pipe(
            map(metadata => {
                return Object.values(metadata.movies || {});
            }),
        );
    }
    /**
     * Retrieves a specific movie
     * @param movieId The movie ID
     */
    getMovie(movieId: string): Observable<Movie> {
        return this.getMovies().pipe(map(movies => {
            return movies.find(m => m.id === movieId);
        }));
    }
    /**
     * Updates a movie
     * @param movie The movie
     */
    updateMovie(movie: Movie): void {
        this.electronService.updateMovie(movie.id, movie);
    }
    /**
     * Deletes a movie
     * @param movieId The movie ID
     */
    deleteMovie(movieId: string): void {
        this.electronService.updateMovie(movieId, null);
    }
}
