import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { TitleStrategy, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HandleTitleUpdate } from './core/strategy/titleStrategy';
import {
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { customInterceptor } from './core/interceptors/custom.interceptor';
import { JwtModule } from '@auth0/angular-jwt';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([customInterceptor]),
    ),
    {
      provide: TitleStrategy,
      useClass: HandleTitleUpdate,
    },
    importProvidersFrom(NgHttpLoaderModule.forRoot(), JwtModule),
  ],
};
