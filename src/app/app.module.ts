import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxEchartsModule } from 'ngx-echarts';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { PlacingsComponent } from './components/placings/placings.component';
import { CropsComponent } from './components/crops/crops.component';
import { MachineryComponent } from './components/machinery/machinery.component';
import { AnimalsListComponent } from './components/animals-list/animals-list.component';
import { LoginComponent } from './components/login/login.component';
import { AddPlacingComponent } from './components/placings/add-placing/add-placing.component';
import { MsgModalComponent } from './components/shared/msg-modal/msg-modal.component';
import { AddAnimalComponent } from './components/animals-list/add-animal/add-animal.component';
import { TreatmentsComponent } from './components/animals-list/treatments/treatments.component';
import { AddTreatmentComponent } from './components/animals-list/treatments/add-treatment/add-treatment.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { AddTaskComponent } from './components/tasks/add-task/add-task.component';
import { AddMachineComponent } from './components/machinery/add-machine/add-machine.component';
import { MaintenancesComponent } from './components/machinery/maintenances/maintenances.component';
import { AddMaintenanceComponent } from './components/machinery/maintenances/add-maintenance/add-maintenance.component';
import { AddFieldComponent } from './components/crops/add-field/add-field.component';
import { SeasonsComponent } from './components/crops/seasons/seasons.component';
import { AddSeasonComponent } from './components/crops/seasons/add-season/add-season.component';
import { CropEventsComponent } from './components/crops/seasons/crop-events/crop-events.component';
import { AddEventComponent } from './components/crops/seasons/crop-events/add-event/add-event.component';
import { JwtInterceptor } from './services/interceptors/jwt.interceptor';
import { SignupComponent } from './components/login/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PlacingsComponent,
    CropsComponent,
    MachineryComponent,
    AnimalsListComponent,
    LoginComponent,
    AddPlacingComponent,
    MsgModalComponent,
    AddAnimalComponent,
    TreatmentsComponent,
    AddTreatmentComponent,
    TasksComponent,
    AddTaskComponent,
    AddMachineComponent,
    MaintenancesComponent,
    AddMaintenanceComponent,
    AddFieldComponent,
    SeasonsComponent,
    AddSeasonComponent,
    CropEventsComponent,
    AddEventComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxEchartsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
