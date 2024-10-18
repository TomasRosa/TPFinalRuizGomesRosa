import { Injectable} from '@angular/core';
import { CarritoService } from './carrito.service';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { Film } from '../models/film';

@Injectable({
  providedIn: 'root'
})
export class SharedServicesService{
  
  constructor(
    private carritoService: CarritoService, 
    private userService: UserService, 
    private router: Router,
  ) {}

  navegarFilmDetail(rank: number) {
    this.router.navigate(['film-detail', rank]);
  }

  navegarFavouriteList ()
  {
    this.router.navigate(['favourite-list']);
  }

  agregarPeliculaAlCarrito(film: Film) {
    if (this.userService.isLoggedIn) {
      this.carritoService.agregarAlCarrito(film);
    } else {
      alert("Debes iniciar sesión para agregar películas al carrito.");
    }
  }

  getMovieGroups(movies: any[]): any[][] {
    const groupedMovies: any[][] = [];
    for (let i = 0; i < movies.length; i += 5) {
      groupedMovies.push(movies.slice(i, i + 5));
    }
    return groupedMovies;
  }
}
