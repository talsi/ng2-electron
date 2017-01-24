import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import 'hammerjs';

import { AppComponent } from './app.component';
import { MaterialModule } from "@angular/material";
import { SystemInfoPanelComponent } from './system-info/system-info-panel.component';
import { NodeApiService } from "../node";
import { SystemInfoItemComponent } from "./system-info-item/system-info-item.component";

@NgModule({
  declarations: [
    AppComponent,
    SystemInfoPanelComponent,
    SystemInfoItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  providers: [NodeApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
