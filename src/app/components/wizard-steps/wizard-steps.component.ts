import { Component, OnInit } from '@angular/core';
import { Router, Routes, Route } from "@angular/router";
import { WizardService } from "../../services";

@Component({
  selector: 'wizard-steps',
  templateUrl: 'wizard-steps.component.html',
  styleUrls: ['wizard-steps.component.css']
})
export class WizardStepsComponent implements OnInit {

  constructor(public router: Router,
              public wizardService: WizardService) { }

  ngOnInit() {
  }

  goToNextStep() {

    let nextRoute: Route;
    const routes: Route[] = this.router.config as Route[];

    routes.forEach((route: Route, index: number) => {
      if(this.router.url === `/${route.path}`){
        nextRoute = routes[index + 1];
      }
    });

    this.router.navigate([nextRoute ? nextRoute.path : 'page-not-found'])
      .then(() => this.wizardService.emitStepValidity(false));
  }
}
