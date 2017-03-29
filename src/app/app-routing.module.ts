import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  SystemInfoPanelComponent,
  PageNotFoundComponent,
  AppConfigComponent,
  WorkspaceConfigComponent
} from "./components";

const routes: Routes = [
  {
    path: 'system-requirements',
    component: SystemInfoPanelComponent
  },
  {
    path: 'workspace-config',
    component: WorkspaceConfigComponent
  },
  {
    path: 'app-config',
    component: AppConfigComponent
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
