import { Component, OnInit, Input } from '@angular/core';
import { NodeApiService } from "../../services";
import { ICmdOutput } from "../../interfaces";

@Component({
  selector: 'system-info-item',
  templateUrl: 'system-info-item.component.html',
  styleUrls: ['system-info-item.component.css']
})
export class SystemInfoItemComponent implements OnInit {

  @Input() name: string;
  @Input() cmd: string;
  @Input() concatOutput: boolean;
  @Input() requirements: string;
  @Input() updateCmd: string;

  cmdOutput: string = '';
  error: string = '';
  valid: boolean = false;
  cmdCompleted: boolean = false;
  status: string = '';

  constructor(private node: NodeApiService) { }

  ngOnInit() {
    this.verifyVersion();
  }

  private verifyVersion() {
    this.status = 'Verifying version...';
    this.node.cmd(this.cmd).subscribe(
      output => this.onCmdOutput(output),
      err => this.error = err,
      () => this.omCmdComplete()
    )
  }

  private onCmdOutput(output: ICmdOutput) {
    switch (output.type){
      case 'info':
        this.concatOutput ? this.cmdOutput += output.data : this.cmdOutput = output.data;
        break;
      case 'error':
        if(output.data.indexOf('is not recognized') > -1) this.cmdOutput = `${this.name} is not installed`;
        break;
    }
  }

  private omCmdComplete() {
    this.cmdCompleted = true;
    this.status = 'installed:';
    this.valid = this.cmdOutput.indexOf(this.requirements) > -1;
  }

  update() {
    if(this.updateCmd.startsWith('http')){
      return this.node.openExternalBrowser(this.updateCmd);
    }
    this.reset();
    this.status = 'Updating...';
    this.node.cmd(this.updateCmd).subscribe(
      data => null,
      err => this.error = err,
      () => this.verifyVersion()
    );
  }

  private reset() {
    this.cmdOutput = '';
    this.error = '';
    this.valid = false;
    this.cmdCompleted = false;
  }

  refresh() {
    this.reset();
    this.verifyVersion();
  }
}
