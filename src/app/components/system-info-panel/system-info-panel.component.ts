import { Component, OnInit } from '@angular/core';
import { SystemRequirementsService } from "../../services";

@Component({
  selector: 'system-info-panel',
  templateUrl: 'system-info-panel.component.html',
  styleUrls: ['system-info-panel.component.css']
})
export class SystemInfoPanelComponent implements OnInit {

  constructor(public systemRequirementsService: SystemRequirementsService) { }

  ngOnInit() {
  }

}
