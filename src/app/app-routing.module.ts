import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//! Components
import { MainComponent } from './components/main/main.component';
import { AnimalsComponent } from './components/animals/animals.component';
import { CropsComponent } from './components/crops/crops.component';
import { MachineryComponent } from './components/machinery/machinery.component';
import { AnimalsListComponent } from './components/animals-list/animals-list.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { animation: 'loginPage' } },
  { path: 'main', component: MainComponent, data: { animation: 'mainPage' } },
  { path: 'animals', component: AnimalsComponent, data: { animation: 'animalsPage' } },
  { path: 'animals-list', component: AnimalsListComponent, data: { animation: 'animalsListPage' } },
  { path: 'crops', component: CropsComponent, data: { animation: 'cropsPage' } },
  { path: 'machinery', component: MachineryComponent, data: { animation: 'machineryPage' } },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
