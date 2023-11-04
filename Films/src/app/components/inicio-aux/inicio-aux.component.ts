import { Component, OnInit } from '@angular/core';
import { FilmsFromAPIService } from 'src/app/services/films-from-api.service';

@Component({
  selector: 'app-inicio-aux',
  templateUrl: './inicio-aux.component.html',
  styleUrls: ['./inicio-aux.component.css']
})
export class InicioAuxComponent implements OnInit{
  films: any;

  constructor (private dataFilms: FilmsFromAPIService)
  {
  }

  async ngOnInit(): Promise<void>{
      await this.obtenerMovies ();
      this.mostrarPeliculasRandom ();
  }

  async obtenerMovies ()
  {
    this.films = await this.dataFilms.getMovies ();
     /* try {
      const data = await this.dataFilms.getMovies();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error al obtener datos de películas:", error);
      throw error;
    }  */
  }

  generarNumRandom (): number
  {
    let numeroRandom;
    do {
      numeroRandom = Math.floor(Math.random() * 30);
    } while (numeroRandom == 5 || numeroRandom == 6 || numeroRandom == 7 || numeroRandom == 2);

    return numeroRandom;
  } 

  mostrarPeliculasRandom ()
  {
    let arrayNums: number []= []; 
    if (this.films) 
    {
      const tabla = document.createElement("table");
      const contenedorTabla = document.getElementById("tablaPeliculas");
  
      for (let i = 0; i < 5; i++) 
      {
        let numeroRandom = this.generarNumRandom ();

        if (arrayNums[0] != null)
        {
          for (let i = 0; i < arrayNums.length; i++)
          {
             if (arrayNums[i] == numeroRandom)
             {
               numeroRandom = this.generarNumRandom ();
               i = 0;
             }
          }
        }

        console.log (numeroRandom);

        const filas = document.createElement("tr");
        const filas2 = document.createElement ("tr");
        if (this.films[numeroRandom].image != null)
        {
          filas.innerHTML = 
          `
            <td><img alt = "Imagen no disponible"src='${this.films[numeroRandom].image}' width="100" height="100"></td>
          `;
        }

        filas2.innerHTML = 
        `
         <td>${this.films[numeroRandom].title}</td>
        `
        tabla.appendChild(filas);
        tabla.appendChild(filas2);

        arrayNums[i] = numeroRandom; 
      }
  
      if (contenedorTabla) {
        contenedorTabla.appendChild(tabla);
      } else {
        console.error("No se encontró el contenedor de la tabla.");
      }
    } else {
      console.error("No se encontraron datos de películas.");
    }
}
}