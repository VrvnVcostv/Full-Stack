// app.routes.ts
import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CraftersPageComponent } from './pages/crafters-page/crafters-page.component';
import { StorePageComponent } from './pages/store-page/store-page.component';
import { StashPageComponent } from './pages/stash-page/stash-page.component';
import { QuestsPageComponent } from './pages/quests-page/quests-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'main',
    component: MainPageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  
  {
    path: 'register',
    component: RegisterPageComponent
  },
  {
    path: 'crafters',
    component: CraftersPageComponent
  },
  {
    path: 'store',
    component: StorePageComponent
  },
  {
    path: 'stash',
    component: StashPageComponent
  },
  {
    path: 'quests',
    component: QuestsPageComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
