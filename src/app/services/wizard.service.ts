import { Injectable } from '@angular/core';
import { Observable, Observer } from "rxjs";
import { ISystemRequirement } from "../interfaces";

const systemRequirements: ISystemRequirement[] = [
  {
    name: 'node',
    cmd: 'node -v',
    format: 'plain text',
    version: '6.9.0',
    range: 'greater than or equal to',
    updateCmd: 'https://nodejs.org/en/'
  },
  // {
  //   name: 'npm',
  //   cmd: 'npm -v',
  //   format: 'plain text',
  //   version: '3.0.0',
  //   range: 'greater than or equal to',
  //   updateCmd: 'npm uninstall -g gulp && npm install -g gulp@3.9.1'
  // },
  // {
  //   name: 'gulp',
  //   cmd: 'npm list --global --depth=0 --json gulp',
  //   format: 'json',
  //   version: '3.9.1',
  //   range: 'equal to',
  //   updateCmd: 'npm uninstall -g gulp && npm install -g gulp@3.9.1'
  // },
  // {
  //   name: 'typescript',
  //   cmd: 'npm list --global --depth=0 --json typescript',
  //   format: 'json',
  //   version: '2.1.1',
  //   range: 'equal to',
  //   updateCmd: 'npm uninstall -g typescript && npm install -g typescript@2.1.1'
  // },
  // {
  //   name: 'angular-cli',
  //   cmd: 'npm list --global --depth=0 --json angular-cli',
  //   format: 'json',
  //   version: '1.0.0-beta.26',
  //   range: 'equal to',
  //   updateCmd: 'npm uninstall -g angular-cli && npm cache clean && npm install -g angular-cli@1.0.0-beta.26'
  // }
];

@Injectable()
export class WizardService {

  public stepValid = new Observable<boolean>((o: Observer<boolean>) => {this.observer = o}).share();

  private observer: Observer<boolean>;

  constructor() { }

  emitStepValidity(isValid: boolean) {
    this.observer.next(isValid);
  }

  // TODO: GET json from remote
  getSystemRequirements(): ISystemRequirement[] {
    return systemRequirements;
  }

  // TODO: GET string from remote
  getInfraRepositoryURL(): string {
    return 'http://il1a-gl-dev.gigya.net/Console/Site.git';
  }
}
