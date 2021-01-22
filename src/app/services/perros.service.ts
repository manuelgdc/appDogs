import { Inject, Injectable } from '@angular/core';
import { AppConfig, APP_CONFIG } from '../app.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PerrosService {

  private urlAllDogs: string;

  constructor(
    private httpclient: HttpClient,
    @Inject(APP_CONFIG) appData: AppConfig
  ) { 
    this.urlAllDogs = appData.apiEndpoint;
  }

  /**
   * carga combo con listado de razas
   */
  getDogs() {
    return this.httpclient.get(`${this.urlAllDogs}/api/breeds/list/all`
    ).toPromise<any>()
      .catch(err => {
        if (err.error && err.error.message) {
          throw err.error;
        } else {
          throw err;
        }
      });
  }

  /**
   * carga fotos por raza de perros
   * @param  {} raza
   */
  getImagesDogs(raza: string) {
    return this.httpclient.get(`${this.urlAllDogs}/api/breed/${raza}/images`
    ).toPromise<any>()
      .catch(err => {
        if (err.error && err.error.message) {
          throw err.error;
        } else {
          throw err;
        }
      });
  }

  /**
   * carga fotos por subcategoria
   * @param  {string} raza
   * @param  {string} tipo
   */
  getImagesTypesDogs(raza: string, tipo: string) {
    return this.httpclient.get(`${this.urlAllDogs}/api/breed/${raza}/${tipo}/images`
    ).toPromise<any>()
      .catch(err => {
        if (err.error && err.error.message) {
          throw err.error;
        } else {
          throw err;
        }
      });
  }


}
