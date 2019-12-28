import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { AnimalsComponent } from './components/animals/animals.component';
import { CropsComponent } from './components/crops/crops.component';
import { MachineryComponent } from './components/machinery/machinery.component';
import { AnimalsListComponent } from './components/animals-list/animals-list.component';
import { LoginComponent } from './components/login/login.component';
import { AddPlacingComponent } from './components/animals/add-placing/add-placing.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AnimalsComponent,
    CropsComponent,
    MachineryComponent,
    AnimalsListComponent,
    LoginComponent,
    AddPlacingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
