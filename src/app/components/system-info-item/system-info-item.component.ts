import { Component, OnInit, Input } from '@angular/core';
import { NodeApiService } from "../../services";
import { MdDialogRef, MdDialog, MdDialogConfig } from "@angular/material";
import { CmdOutputDialogComponent } from "../cmd-output-dialog/cmd-output-dialog.component";

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

  dialogRef: MdDialogRef<CmdOutputDialogComponent>;

  constructor(private node: NodeApiService,
              private dialog: MdDialog) { }

  ngOnInit() {
    this.runCmd();
  }

  private runCmd() {
    this.node.cmd(this.cmd).subscribe(
      data => this.concatOutput ? this.cmdOutput += data : this.cmdOutput = data,
      err => this.error = err,
      () => this.omCmdComplete()
    )
  }

  private omCmdComplete() {
    this.cmdCompleted = true;
    this.valid = this.cmdOutput.indexOf(this.requirements) > -1;
  }

  update() {

    this.dialogRef = this.dialog.open(CmdOutputDialogComponent,  <MdDialogConfig> {
      disableClose: true,
      width: '256px'
    });

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('result: ' + result);
      this.dialogRef = null;
    });

    // this.dialogRef.afterClosed().subscribe(result => {
    //   console.log('result: ' + result);
    //   this.dialogRef = null;
    // });
    // this.node.cmd(this.updateCmd).subscribe(
    //   data => this.concatOutput ? this.cmdOutput += data : this.cmdOutput = data,
    //   err => this.error = err,
    //   () => this.omCmdComplete()
    // )
  }
}
