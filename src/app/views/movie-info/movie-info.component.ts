import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Movie } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { generateId } from '../../helpers/generate-id';
import { of } from 'rxjs';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.scss']
})
export class MovieInfoComponent implements OnInit {
  movie: Movie = {
    airDate: '21-04-1982',
    duration: 210,
    id: generateId('movie_'),
    imagePath: '',
    subsPath: '',
    title: 'New movie',
    videoPath: '',
  };
  errorMessage = '';
  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const movieId = params.get('movieId');
        if (movieId !== 'create') {
          return this.moviesService.getMovie(movieId);
        }
        return of(null);
      })
    ).subscribe(async movie => {
      if (movie) {
        this.movie = movie;
      }
    });
  }

  changeFile(event, property: 'imagePath' | 'videoPath' | 'subsPath') {
    const target = event.target;
    const file = target.files[0];
    const filePath = file.path;
    this.movie[property] = filePath;
    console.log(this.movie);

  }


  create(): void {
    if (this.validateMovie()) {
      console.log('Creating...', this.movie);
      this.moviesService.updateMovie(this.movie);
      this.router.navigate(['']);
    } else {
      // show error
      this.errorMessage = `Wrong inputs!`;
    }
  }

  validateMovie(): boolean {
    const title = this.movie.title;
    const duration = this.movie.duration;
    if (title.length === 0 || duration < 0) {
      return false;
    }
    return true;
  }

}
