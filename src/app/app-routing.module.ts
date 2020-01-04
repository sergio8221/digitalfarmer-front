import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//! Components
import { MainComponent } from './components/main/main.component';
import { PlacingsComponent } from './components/placings/placings.component';
import { CropsComponent } from './components/crops/crops.component';
import { MachineryComponent } from './components/machinery/machinery.component';
import { AnimalsListComponent } from './components/animals-list/animals-list.component';
import { LoginComponent } from './components/login/login.component';
import { TreatmentsComponent } from './components/animals-list/treatments/treatments.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { MaintenancesComponent } from './components/machinery/maintenances/maintenances.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { animation: 'loginPage' } },
  { path: 'main', component: MainComponent, data: { animation: 'mainPage' } },
  { path: 'placings', component: PlacingsComponent, data: { animation: 'placingsPage' } },
  { path: 'animals-list', component: AnimalsListComponent, data: { animation: 'animalsListPage' } },
  { path: 'treatments', component: TreatmentsComponent, data: { animation: 'treatmentsPage' } },
  { path: 'crops', component: CropsComponent, data: { animation: 'cropsPage' } },
  { path: 'machinery', component: MachineryComponent, data: { animation: 'machineryPage' } },
  { path: 'maintenances', component: MaintenancesComponent, data: { animation: 'maintenancesPage' } },
  { path: 'tasks', component: TasksComponent, data: { animation: 'tasksPage' } },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
