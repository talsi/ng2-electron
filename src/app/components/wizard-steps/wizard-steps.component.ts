import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'wizard-steps',
  templateUrl: 'wizard-steps.component.html',
  styleUrls: ['wizard-steps.component.css']
})
export class WizardStepsComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

}
