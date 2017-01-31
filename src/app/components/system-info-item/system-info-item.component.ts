import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NodeApiService } from "../../services";
import { ICmdOutput, IRequirementValidationEvent, ISystemRequirement } from "../../interfaces";
import * as semver from "semver";

@Component({
  selector: 'system-info-item',
  templateUrl: 'system-info-item.component.html',
  styleUrls: ['system-info-item.component.css']
})
export class SystemInfoItemComponent implements OnInit {

  @Input() requirement: ISystemRequirement;

  @Output() validation: EventEmitter<IRequirementValidationEvent> = new EventEmitter<IRequirementValidationEvent>();

  cmdOutput: string = '';
  error: string = '';
  isValid: boolean = false;
  cmdCompleted: boolean = false;
  status: string = '';

  constructor(private node: NodeApiService) { }

  ngOnInit() {
    this.verifyVersion();
  }

  private verifyVersion() {
    this.status = 'Verifying version...';
    this.node.cmd(this.requirement.cmd).subscribe(
      output => this.onCmdOutput(output),
      err => this.error = err,
      () => this.omCmdComplete()
    )
  }

  private onCmdOutput(output: ICmdOutput) {

    if(output.data.indexOf('empty') > -1)
      return this.cmdOutput = `${this.requirement.name} is not installed`;

     if(this.requirement.format === 'json')
       return this.cmdOutput = this.extractVersionFromJsonString(output.data);

      return this.cmdOutput = semver.clean(output.data);
  }

  private extractVersionFromJsonString(jsonString: string) {
    let res = '';
    try{
      res = semver.clean(JSON.parse(jsonString).dependencies[this.requirement.name].version);
    }catch (e){
      res = `${this.requirement.name} is not installed`;
    }
    return res;
  }

  private omCmdComplete() {
    this.cmdCompleted = true;
    this.status = 'installed:';
    this.isValid = this.cmdOutput.indexOf(this.requirement.version) > -1;
    this.validation.emit({
      name: this.requirement.name,
      isValid: this.isValid
    })
  }

  update() {
    if(this.requirement.updateCmd.startsWith('http')){
      return this.node.openExternalBrowser(this.requirement.updateCmd);
    }
    this.reset();
    this.status = 'Updating...';
    this.node.cmd(this.requirement.updateCmd).subscribe(
      data => null,
      err => this.error = err,
      () => this.verifyVersion()
    );
  }

  private reset() {
    this.cmdOutput = '';
    this.error = '';
    this.isValid = false;
    this.cmdCompleted = false;
  }

  refresh() {
    this.reset();
    this.verifyVersion();
  }
}
