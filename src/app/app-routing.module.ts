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
import { SeasonsComponent } from './components/crops/seasons/seasons.component';
import { CropEventsComponent } from './components/crops/seasons/crop-events/crop-events.component';

//! Guards
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { animation: 'loginPage' } },
  { path: 'main', component: MainComponent, data: { animation: 'mainPage' }, canActivate: [AuthGuard] },
  { path: 'placings', component: PlacingsComponent, data: { animation: 'placingsPage' }, canActivate: [AuthGuard] },
  { path: 'animals-list', component: AnimalsListComponent, data: { animation: 'animalsListPage' }, canActivate: [AuthGuard] },
  { path: 'treatments', component: TreatmentsComponent, data: { animation: 'treatmentsPage' }, canActivate: [AuthGuard] },
  { path: 'crops', component: CropsComponent, data: { animation: 'cropsPage' }, canActivate: [AuthGuard] },
  { path: 'seasons', component: SeasonsComponent, data: { animation: 'seasonsPage' }, canActivate: [AuthGuard] },
  { path: 'events', component: CropEventsComponent, data: { animation: 'eventsPage' }, canActivate: [AuthGuard] },
  { path: 'machinery', component: MachineryComponent, data: { animation: 'machineryPage' }, canActivate: [AuthGuard] },
  { path: 'maintenances', component: MaintenancesComponent, data: { animation: 'maintenancesPage' }, canActivate: [AuthGuard] },
  { path: 'tasks', component: TasksComponent, data: { animation: 'tasksPage' }, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
