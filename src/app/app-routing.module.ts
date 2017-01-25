import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemInfoPanelComponent, PageNotFoundComponent } from "./components";

const routes: Routes = [
  {
    path: 'system-requirements',
    component: SystemInfoPanelComponent
  },
  {
    path: 'dummy1',
    component: SystemInfoPanelComponent
  },
  {
    path: 'dummy2',
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
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
