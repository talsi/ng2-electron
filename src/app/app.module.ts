import "hammerjs";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppRoutingModule } from "./app-routing.module";
import { MaterialModule } from "@angular/material";

import { AppComponent } from "./app.component";
import { NodeApiService, WizardService } from "./services";
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
    WizardStepsComponent
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
    NodeApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
