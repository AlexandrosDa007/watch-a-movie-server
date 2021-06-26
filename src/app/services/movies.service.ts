import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Movie } from '../models/movie';
import { ElectronService } from './electron.service';

@Injectable({
    providedIn: 'root'
})
export class MoviesService {
    constructor(
        private electronService: ElectronService,
    ) { }

    getMovies(): Observable<Movie[]> {
        return this.electronService.metadata$.pipe(
            map(metadata => {
                return Object.values(metadata.movies || {});
            }),
        );
    }

    getMovie(movieId: string): Observable<Movie> {
        return this.getMovies().pipe(map(movies => {
            return movies.find(m => m.id === movieId);
        }));
    }

    updateMovie(movie: Movie): void {
        this.electronService.updateMovie(movie.id, movie);
    }

    deleteMovie(movieId: string): void {
        this.electronService.updateMovie(movieId, null);
    }
}