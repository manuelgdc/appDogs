import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class IdiomasService {

  constructor(
    private translate: TranslateService,
  ) { }
  
  /**
   */
  getDefaultLanguage(){
    let language = this.translate.getBrowserLang();
    this.translate.setDefaultLang(language);
    return language;
  }
  /**
   * @param  {} setLang
   */
  setLanguage(setLang) {
    this.translate.use(setLang);
  }
  
}
