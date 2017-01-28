import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
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

}
