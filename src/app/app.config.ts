import { provideAnimations } from "@angular/platform-browser/animations";
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loggingInterceptor } from '../interceptor/logging';

export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(), provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), 
    providePrimeNG({
    theme: {
      preset: Aura
    }
  }), provideHttpClient(withInterceptors([loggingInterceptor]))]
};
