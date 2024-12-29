import { Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {DenemeComponent} from './pages/deneme/deneme.component';
import {HomeComponent} from './pages/home/home.component';
import {FilmDetailsComponent} from './pages/film-details/film-details.component';
import {ActorDetailsComponent} from './pages/actor-details/actor-details.component';
import {CategoryDetailsComponent} from './pages/category-details/category-details.component';

export const routes: Routes = [
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full',
  },
  {
    path:'home',
    component:HomeComponent,
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
  },
  {
    path:'filmdetails/:id',
    component:FilmDetailsComponent
  },
  {
    path:"oyuncudetails/:id",
    component:ActorDetailsComponent
  },
  {
    path:"filmsbycategoryname/:categoryName",
    component:CategoryDetailsComponent
  }

];
