import "hammerjs";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppRoutingModule } from "./app-routing.module";
import { MaterialModule } from "@angular/material";
import { JsonSchemaFormModule } from 'angular2-json-schema-form/src';

import { AppComponent } from "./app.component";

import {
  NodeApiService,
  WizardService,
  JsonService
} from "./services";

import {
  WizardStepsComponent,
  SystemInfoPanelComponent,
  SystemInfoItemComponent,
  PageNotFoundComponent,
  AppConfigComponent
} from "./components";

import { StepsPipe } from './pipes/steps.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AppConfigComponent,
    SystemInfoPanelComponent,
    SystemInfoItemComponent,
    PageNotFoundComponent,
    WizardStepsComponent,
    StepsPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    JsonSchemaFormModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    {provide: JsonService, useValue: JSON},
    NodeApiService,
    WizardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
