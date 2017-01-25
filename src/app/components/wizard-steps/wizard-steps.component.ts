import { Component, OnInit } from '@angular/core';
import { WizardService } from "../../services/wizard.service";

@Component({
  selector: 'app-wizard-steps',
  templateUrl: 'wizard-steps.component.html',
  styleUrls: ['wizard-steps.component.css']
})
export class WizardStepsComponent implements OnInit {

  constructor(public wizardService: WizardService) { }

  ngOnInit() {
  }

}
