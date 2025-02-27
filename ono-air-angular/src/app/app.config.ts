import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideFirebaseApp, initializeApp} from '@angular/fire/app';
import {provideFirestore, getFirestore} from '@angular/fire/firestore';
import { environment } from '../environments/environment';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes, withComponentInputBinding()), 
     provideAnimationsAsync('noop'), 
     provideAnimationsAsync(),
     importProvidersFrom(provideFirebaseApp(() => initializeApp(environment.firebaseConfig))),
     importProvidersFrom(provideFirestore(() => getFirestore()))
   ]
};
