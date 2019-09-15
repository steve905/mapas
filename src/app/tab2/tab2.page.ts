import { Component, OnInit } from '@angular/core';
import { Marcador } from '../class/marcador';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  ngOnInit()
  {
    this.polygon = true;
    this.polyline = false;
    this.storage.get('marker').then((val) => 
    {
      let marcador : Marcador = JSON.parse(val);
      for (let i in marcador)
      {
        this.marcadores.push(marcador[i]);
        console.log(this.marcadores);
        if(parseInt(i) %2)
        {
          this.paths.push(marcador[i]);
          this.polygon=true;
        } else {
          this.paths.push(marcador[i]);
          this.polygon=false;
        }
       
       
      }  
    });
  }
  ingresarMarcador(lat, lng, title, description){
    const nuevoMarcador = new Marcador(lat, lng, title, description);
    this.marcadores.push(nuevoMarcador);
  }

  marcadores : Marcador[] = [];
  lat = 4.60972222222;
  lng = -74.0816666667;
  paths: Array<any> = [];
  polygon = false;
  latA : number;
  latB : number;
  lngA : number;
  lngB : number;
  polyline = false;

  constructor(private storage: Storage){  }

  agregarMarcador(evento){
    this.ingresarMarcador(parseFloat(evento.coords.lat), parseFloat(evento.coords.lng), evento.coords.title, evento.coords.description);
    // Almacenamiento en local storage
    this.storage.set('marker', JSON.stringify(this.marcadores) );
    console.log(this.marcadores.length);
    // Creación del polígono
     if(this.marcadores.length%2){
          this.paths=this.marcadores;
          this.polygon=true;
    }else{
          this.paths=this.marcadores;
          this.polygon=false;
    }
  }
}
