import { Component, OnInit } from '@angular/core';
import { WizardService } from "../../services";
import { ISystemRequirement,IRequirementValidationEvent } from "../../interfaces";

const validationMap: { [key: string]: boolean; } = {};

@Component({
  selector: 'system-info-panel',
  templateUrl: 'system-info-panel.component.html',
  styleUrls: ['system-info-panel.component.css']
})
export class SystemInfoPanelComponent implements OnInit {

  requirements: ISystemRequirement[];

  constructor(public wizardService: WizardService) {
  }

  ngOnInit() {
    this.requirements = this.wizardService.getSystemRequirements();
    this.requirements.forEach(requirement => validationMap[requirement.name] = false);
  }

  onValidation(validationEvent: IRequirementValidationEvent){
    validationMap[validationEvent.name] = validationEvent.isValid;
    let allRequirementsValid = true;
    for(let name in validationMap){
      if (!validationMap[name]){
        allRequirementsValid = false;
      }
    }
    if(allRequirementsValid){
      this.wizardService.emitStepValidity(true);
    }
  }

}
