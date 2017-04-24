import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NodeApiService } from "../../services";
import { ICmdOutput, IRequirementValidationEvent, ISystemRequirement } from "../../interfaces";
import * as semver from "semver";

const userHomeDir = window['process'].env[(window['process'].platform === 'win32') ? 'USERPROFILE' : 'HOME'];

@Component({
  selector: 'system-info-item',
  templateUrl: 'system-info-item.component.html',
  styleUrls: ['system-info-item.component.css']
})
export class SystemInfoItemComponent implements OnInit {

  @Input() requirement: ISystemRequirement;

  @Output() validation: EventEmitter<IRequirementValidationEvent> = new EventEmitter<IRequirementValidationEvent>();

  version: string = '';
  error: string = '';
  isValid: boolean = false;
  cmdCompleted: boolean = false;
  status: string = '';

  constructor(private node: NodeApiService) { }

  ngOnInit() {
    this.getVersion();
  }

  private getVersion() {
    this.status = 'verifying version...';
    this.node.cmd(this.requirement.cmd, userHomeDir).subscribe(
      output => this.extractVersionFromCmdOutput(output.data),
      err => this.error = err,
      () => this.omCmdComplete()
    );
  }

  private extractVersionFromCmdOutput(cmdOutput: string) {
    if(this.requirement.format === 'json')
      this.version = this.extractVersionFromJsonString(cmdOutput);
    else
      this.version = semver.clean(cmdOutput);
    this.version = this.version || `${this.requirement.name} is not installed`;
  }

  private extractVersionFromJsonString(jsonString: string) {
    try { return semver.clean(JSON.parse(jsonString).dependencies[this.requirement.name].version); } catch (e) {}
  }

  private omCmdComplete() {
    this.cmdCompleted = true;
    this.status = 'installed:';
    this.verifyVersion();
  }

  private verifyVersion() {
    this.isValid = this.isSemverInRange();
    this.validation.emit({
      name: this.requirement.name,
      isValid: this.isValid
    });
  }

  private isSemverInRange() {
    switch (this.requirement.range){
      case "less than":
        return semver.lt(this.version, this.requirement.version);
      case "less than or equal to":
        return semver.lte(this.version, this.requirement.version);
      case "equal to":
        return semver.eq(this.version, this.requirement.version);
      case "greater than":
        return semver.gt(this.version, this.requirement.version);
      case "greater than or equal to":
        return semver.gte(this.version, this.requirement.version);
      default:
        throw 'Unknown range';
    }
  }

  update() {
    if(this.requirement.updateCmd.startsWith('http'))
      return this.node.openExternalBrowser(this.requirement.updateCmd);

    this.reset();
    this.status = 'Updating...';
    this.node.cmd(this.requirement.updateCmd).subscribe(
      data => null,
      err => this.error = err,
      () => this.getVersion()
    );
  }

  private reset() {
    this.version = '';
    this.error = '';
    this.isValid = false;
    this.cmdCompleted = false;
  }
}
