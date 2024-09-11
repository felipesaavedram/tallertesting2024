import { Component,  OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  formData={
    rut:"",
    nombres:"",
    apellidos:"",
    direccion:"",
    ciudad:"",
    telefono:"",
    correo:"",
    fechaNacimiento:"",
    estadoCivil:"",
    comentarios:""
    
  }

  constructor() {}

  ngOnInit() {
  }

  mostrarData(x:any) {
    
    console.log(this.formData);

  }
}
