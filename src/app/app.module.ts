import "hammerjs";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppRoutingModule } from "./app-routing.module";
import { MaterialModule } from "@angular/material";

import { AppComponent } from "./app.component";
import { NodeApiService, SystemRequirementsService } from "./services";
import { StepsPipe } from './pipes/steps.pipe';
import {
  WizardStepsComponent,
  SystemInfoPanelComponent,
  SystemInfoItemComponent,
  PageNotFoundComponent
} from "./components";

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
    NodeApiService,
    SystemRequirementsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
