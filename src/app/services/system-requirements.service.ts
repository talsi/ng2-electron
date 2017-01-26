import { Injectable } from '@angular/core';
import { ISystemRequirement } from "../interfaces";

const systemRequirements: ISystemRequirement[] = [
  {
    name: 'node',
    cmd: 'node -v',
    requirements: '6.9',
    updateCmd: 'https://nodejs.org/en/'
  },
  {
    name: 'gulp',
    cmd: 'gulp -v',
    requirements: '3.9',
    updateCmd: 'npm uninstall -g gulp && npm install -g gulp@3.9.1'
  },
  {
    name: 'typescript',
    cmd: 'tsc -v',
    requirements: '2.1.1',
    updateCmd: 'npm uninstall -g typescript && npm install -g typescript@2.1.1'
  },
  {
    name: 'angular cli',
    cmd: 'ng -v',
    requirements: 'angular-cli: 1.0.0-beta.26',
    updateCmd: 'npm uninstall -g angular-cli && npm cache clean && npm install -g angular-cli@1.0.0-beta.26',
    concatOutput: true
  }
];

@Injectable()
export class SystemRequirementsService {

  constructor() { }

  // TODO: GET json from remote
  getSystemRequirements(): ISystemRequirement[] {
    return systemRequirements;
  }
}
