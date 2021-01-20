import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PerrosService } from '../services/perros.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  dogs: any[];
  tipos: any[];
  show: boolean = false;
  imageDogs: any;
  value1: string;
  value2: string;

  constructor(
    private dogsSrv: PerrosService,
    private toastCtrl: ToastController,
  ) { }

  ngOnInit() {
    this.getRazas();
  }

  /**
   * carga el listado inicial de perros por raza
   */
  getRazas() {
    this.dogsSrv.getDogs()
      .then((data) => {
        this.dogs = Object.keys(data.message);
      })
      .catch(err => {
        this.presentToast(err.message, 5);
      });
  }

  /**
   * muestra imagenes por raza
   * @param  {} $event
   */
  getPerros($event) {
    let found: any[];
    this.dogsSrv.getImagesDogs($event.target.value)
      .then((res) => {
        this.imageDogs = res.message;
      })
    this.dogsSrv.getDogs()
      .then((data) => {
        found = Object.entries(data.message).find(dog => dog[0] === $event.target.value);
        this.tipos = Object.values(found[1]);
        this.tipos.length == 0 ? (this.show = false) : (this.show = true, this.tipos);
      })
      .catch(err => {
        this.presentToast(err.message, 5);
      });
  }

  /**
  * muestra imágenes por subcategoria raza-tipo
  * @param  {} $event
  */
  getTipos() {
    this.dogsSrv.getImagesTypesDogs(this.value1, this.value2)
      .then((res) => {
        this.imageDogs = res.message;
      })
      .catch(err => {
        this.presentToast(err.message, 5);
      });
  }

  /**
   * @param  {string} msg
   * @param  {number} durationSec?
   */
  async presentToast(msg: string, durationSec?: number) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: (durationSec || 2) * 1000
    });
    toast.present();
  }

}
