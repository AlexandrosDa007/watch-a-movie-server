import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Movie[];
  constructor(
    private moviesService: MoviesService,
  ) { }

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe(movies => {
      console.log(movies);
      this.movies = movies;
    })
  }

  deleteMovie(movieId: string): void {
    this.moviesService.deleteMovie(movieId);
  }
}
