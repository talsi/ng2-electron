import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { MaterialModule } from "@angular/material";
import { PageNotFoundComponent } from "./page-not-found";
import { SystemInfoPanelComponent, SystemInfoItemComponent } from "./steps";
import { NodeApiService } from "../node";

import "hammerjs";

@NgModule({
  declarations: [
    AppComponent,
    SystemInfoPanelComponent,
    SystemInfoItemComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AppRoutingModule
  ],
  providers: [NodeApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
