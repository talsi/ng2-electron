import { Injectable } from '@angular/core';
import { IWizardStep } from "../interfaces";

@Injectable()
export class WizardService {

  constructor() { }

  getSteps(): IWizardStep[] {
    return [
      {
        name: 'System Requirements',
        isActive: true
      },
      {
        name: 'App Settings',
        isActive: false
      }
    ];
  }

}
