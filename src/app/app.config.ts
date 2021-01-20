import { AppConfig } from './app-config.interface';
export { AppConfig} from './app-config.interface';


import { InjectionToken } from '@angular/core';
import { environment } from '../environments/environment';

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');


export    const APPDATA_CONFIG: AppConfig =
    ( environment.production ) ?
    {
        apiEndpoint: '',
        version: '0.0.0',
        nameApp: 'appPerros',
    } : {
        apiEndpoint: 'https://dog.ceo',
        version: '1.0.0',
        nameApp: 'appPerros',
    };