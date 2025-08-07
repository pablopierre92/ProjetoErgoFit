import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http'
import { provideClientHydration } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, { 
  ...appConfig,
providers: [
  ...(appConfig.providers || []),
  provideHttpClient(withFetch()),
  provideClientHydration() //Ativa a hidratação do Angular

]
})
  .catch((err) => console.error(err));
