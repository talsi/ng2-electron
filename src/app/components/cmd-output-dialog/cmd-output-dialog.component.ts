import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from "@angular/material";

@Component({
  selector: 'cmd-output-dialog',
  templateUrl: './cmd-output-dialog.component.html',
  styleUrls: ['./cmd-output-dialog.component.css']
})
export class CmdOutputDialogComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<CmdOutputDialogComponent>) { }

  ngOnInit() {
  }

}
