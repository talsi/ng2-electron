import { Component, OnInit, Input } from '@angular/core';
import { NodeApiService } from "../../node/node-api.service";

@Component({
  selector: 'system-info-item',
  templateUrl: './system-info-item.component.html',
  styleUrls: ['./system-info-item.component.css']
})
export class SystemInfoItemComponent implements OnInit {

  @Input() name: string;
  @Input() cmd: string;
  @Input() bufferOutput: boolean;

  info: string = '';
  error: string = '';
  cmdCompleted: boolean = false;

  constructor(private node: NodeApiService) { }

  ngOnInit() {
    this.node.cmd(this.cmd).subscribe(
      data => this.bufferOutput ? this.info += data : this.info = data,
      err => this.error = err,
      () => this.cmdCompleted = true
    )
  }

}
