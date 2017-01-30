import { Injectable } from '@angular/core';
import { ISystemRequirement } from "../interfaces";

const systemRequirements: ISystemRequirement[] = [
  {
    name: 'node',
    cmd: 'node -v',
    format: 'plain text',
    version: '6.9',
    updateCmd: 'https://nodejs.org/en/'
  },
  {
    name: 'npm',
    cmd: 'npm -v',
    format: 'plain text',
    version: '3',
    updateCmd: 'npm uninstall -g gulp && npm install -g gulp@3.9.1'
  },
  {
    name: 'gulp',
    cmd: 'npm list --global --depth=0 --json gulp',
    format: 'json',
    version: '3.9.1',
    updateCmd: 'npm uninstall -g gulp && npm install -g gulp@3.9.1'
  },
  {
    name: 'typescript',
    cmd: 'npm list --global --depth=0 --json typescript',
    format: 'json',
    version: '2.1.1',
    updateCmd: 'npm uninstall -g typescript && npm install -g typescript@2.1.1'
  },
  {
    name: 'angular-cli',
    cmd: 'npm list --global --depth=0 --json angular-cli',
    format: 'json',
    version: '1.0.0-beta.26',
    updateCmd: 'npm uninstall -g angular-cli && npm cache clean && npm install -g angular-cli@1.0.0-beta.26'
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
