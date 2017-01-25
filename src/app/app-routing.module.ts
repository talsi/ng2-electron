import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemInfoPanelComponent } from "./steps";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: 'system-requirements',
    component: SystemInfoPanelComponent
  },
  {
    path: '',
    redirectTo: '/system-requirements',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
