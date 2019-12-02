import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//! Components
import { MainComponent } from './components/main/main.component';
import { AnimalsComponent } from './components/animals/animals.component';
import { CropsComponent } from './components/crops/crops.component';
import { MachineryComponent } from './components/machinery/machinery.component';
import { AnimalsListComponent } from './components/animals-list/animals-list.component';


const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'animals', component: AnimalsComponent },
  { path: 'animals-list', component: AnimalsListComponent },
  { path: 'crops', component: CropsComponent },
  { path: 'machinery', component: MachineryComponent },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: '**', redirectTo: 'main', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
