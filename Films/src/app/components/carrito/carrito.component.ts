import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/models/film';
import { CarritoService } from 'src/app/services/carrito.service';

  @Component({
    selector: 'app-carrito',
    templateUrl: './carrito.component.html',
    styleUrls: ['./carrito.component.css']
  })
  
  export class CarritoComponent implements OnInit {
    carritoDeCompras: Array<Film> = [];
    totalCarrito: number = 0;

    constructor(private carritoService: CarritoService) {}

    ngOnInit(): void {
      this.carritoService.carrito$.subscribe(carrito => {
        this.carritoDeCompras = carrito;
        this.actualizarTotalCarrito();
      });
    }

    private actualizarTotalCarrito() 
    {
      this.totalCarrito = this.carritoDeCompras.reduce((total, pelicula) => total + (pelicula.precio = this.verificarPrecioPelicula(pelicula)), 0);
    }

    verificarPrecioPelicula (pelicula: Film): number
    {
      if (pelicula.precio > 1500)
      {
        pelicula.precio = pelicula.precio/2;
      }

      return pelicula.precio;
    }

    eliminarDelCarrito(pelicula: Film) {
      this.carritoService.eliminarDelCarrito(pelicula);
    }

    limpiarCarrito() {
      this.carritoService.limpiarCarrito();
    }
}
  