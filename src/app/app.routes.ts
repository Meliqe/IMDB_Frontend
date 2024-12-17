import { Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {DenemeComponent} from './pages/deneme/deneme.component';

export const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full',
  },
  {
    path:'login',
    component:LoginComponent,
  },
  {
    path:'register',
    component:RegisterComponent,
  },
  {
    path:'deneme',
    component:DenemeComponent,
  }


];
