import "hammerjs";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppRoutingModule } from "./app-routing.module";
import { MaterialModule } from "@angular/material";

import { AppComponent } from "./app.component";

import {
  WizardService,
  NodeApiService,
  SystemRequirementsService
} from "./services";

import {
  WizardStepsComponent,
  SystemInfoPanelComponent,
  SystemInfoItemComponent,
  PageNotFoundComponent
} from "./components";

import { StepsPipe } from './pipes/steps.pipe';

@NgModule({
  declarations: [
    AppComponent,
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
    AppRoutingModule
  ],
  providers: [
    WizardService,
    NodeApiService,
    SystemRequirementsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
