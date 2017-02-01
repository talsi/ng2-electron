import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-app-config',
  templateUrl: 'app-config.component.html',
  styleUrls: ['app-config.component.css']
})
export class AppConfigComponent implements OnInit {

  @ViewChild('editor') editor;

  text: string = "";

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.editor.setTheme("eclipse");

    this.editor.getEditor().setOptions({
      enableBasicAutocompletion: true
    });

    this.editor.getEditor().commands.addCommand({
      name: "showOtherCompletions",
      bindKey: "Ctrl-.",
      exec: function (editor) {

      }
    })
  }
}
