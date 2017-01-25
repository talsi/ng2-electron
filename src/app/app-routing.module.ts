import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemInfoPanelComponent } from "./wizard";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";

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
