import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, LoadingController, Platform, ToastController } from '@ionic/angular';
import { IdiomasService } from '../services/idiomas.service';
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
  goBack: boolean = false;
  @ViewChild('IonContent') content: IonContent;
  selectedLanguage:boolean;

  constructor(
    private dogsSrv: PerrosService,
    private languagesSrv: IdiomasService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private platform: Platform,
  ) { }

  ngOnInit() {
    this.getRazas();
  }

  /**
   * carga el listado inicial de perros por raza
   */
  async getRazas() {
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
  async getPerros($event) {
    let found: any[];
    this.dogsSrv.getImagesDogs($event.target.value)
      .then((res) => {
        this.imageDogs = res.message;
        this.show = false;
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
   * @param  {number} pos
   */
  obtieneScrollPos(pos: number) {
    pos > this.platform.height() ? this.goBack = true : this.goBack = false;
  }

  /**
   * Permite desplazarse a la posición inicial
   */
  irHaciaArriba() {
    this.content.scrollToTop(500);
  }

  /**
   * modifica el idioma en la app
   * @param  {} lang
   */
  changeLanguage() {
    this.selectedLanguage ?  this.languagesSrv.setLanguage('en') :  this.languagesSrv.setLanguage('es');
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

  reset() {
    this.imageDogs = [];
  }

}
