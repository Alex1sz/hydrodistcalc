import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { SiteListComponent } from './site-list/site-list.component';
import { ScenarioFormComponent } from './scenario-form/scenario-form.component';
import { ScenarioResultsComponent } from './scenario-results/scenario-results.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CommonModule,
    AppComponent,
    SiteListComponent,
    ScenarioFormComponent,
    ScenarioResultsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 