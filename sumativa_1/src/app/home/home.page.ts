import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  formData = {
    rut: "",
    nombres: "",
    apellidos: "",
    direccion: "",
    ciudad: "",
    telefono: "",
    correo: "",
    fechaNacimiento: "",
    estadoCivil: "",
    comentarios: ""
  };

  dataRecords: any[] = [];  // Arreglo para almacenar los registros
  filteredRecords: any[] = [];  // Para resultados de la búsqueda

  constructor(private alertCtrl: AlertController) {}

  ngOnInit() {
    this.filteredRecords = [...this.dataRecords];
  }

  // Función para guardar los datos en el arreglo
  async guardarData() {
    const existingIndex = this.dataRecords.findIndex(
      record => record.rut === this.formData.rut
    );

    if (existingIndex >= 0) {
      const alert = await this.alertCtrl.create({
        header: 'Registro existente',
        message: 'El registro con este RUT ya existe. ¿Desea sobrescribirlo?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: 'Sobrescribir',
            handler: () => {
              this.dataRecords[existingIndex] = { ...this.formData };
              this.limpiarFormulario();
            }
          }
        ]
      });
      await alert.present();
    } else {
      this.dataRecords.push({ ...this.formData });
      this.limpiarFormulario();
    }
  }

  // Función para limpiar el formulario
  limpiarFormulario() {
    this.formData = {
      rut: "",
      nombres: "",
      apellidos: "",
      direccion: "",
      ciudad: "",
      telefono: "",
      correo: "",
      fechaNacimiento: "",
      estadoCivil: "",
      comentarios: ""
    };
    this.filteredRecords = [...this.dataRecords];
  }

  // Función para cerrar el formulario y mostrar los registros
  cerrarFormulario() {
    this.filteredRecords = [...this.dataRecords];
    const message = this.dataRecords.length > 0
      ? 'Registro finalizado. Los registros guardados se muestran a continuación.'
      : 'No hay registros guardados.';
    this.alertCtrl.create({
      header: 'Formulario cerrado',
      message: message,
      buttons: ['OK']
    }).then(alert => alert.present());
  }

  // Función para buscar registros por apellido
  buscarPorApellido(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredRecords = this.dataRecords.filter(record =>
      record.apellidos.toLowerCase().includes(query)
    );
  }
}