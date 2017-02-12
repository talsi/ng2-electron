import { Component, OnInit, ViewChild } from '@angular/core';
import { AceEditorComponent } from 'ng2-ace-editor';
import { JsonSchema } from '../../interfaces';
import * as ajv from 'ajv';
import { WizardService } from "../../services/wizard.service";

const appConfigJsonSchema : JsonSchema = {
  required: ['someProperty'],
  properties: {
    someProperty: {
      type: 'string',
      minLength: 1
    }
  }
};

const mySchema = {
  "schema": {
    "comment": {
      "type": "string",
      "title": "Comment"
    },
    "name": {
      "type": "string",
      "title": "Name"
    },
    "age": {
      "type": "number",
      "title": "Age"
    }
  },
  "form": [ {
    "key": "comment",
    "type": "textarea"
  }, {
    "type": "fieldset",
    "title": "Author",
    "expandable": true,
    "items": [
      "name",
      "age"
    ]
  } ]
};

const jsonValidator = ajv().compile(appConfigJsonSchema);

@Component({
  selector: 'app-app-config',
  templateUrl: 'app-config.component.html',
  styleUrls: ['app-config.component.css']
})
export class AppConfigComponent implements OnInit {

  @ViewChild('editor') editor: AceEditorComponent;

  schema: JsonSchema = mySchema;
  text: string = '';
  error: string = '';

  constructor(private wizardService: WizardService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    //this.editor.setTheme("eclipse");
    this.editor.getEditor().setOptions({
      enableBasicAutocompletion: true,
      blockScrolling: Infinity
    });
    debugger;
  }

  onChanges(data){
    console.log(`onChanges: ${JSON.stringify(data, null, 4)}`);
    this.text = JSON.stringify(data, null, 4);
  }

  onSubmit(data){
    console.log(`onSubmit: ${JSON.stringify(data, null, 4)}`);
  }

  validate(text){
    try{
      if(jsonValidator(JSON.parse(text))){
        this.error = '';
        this.wizardService.emitStepValidity(true);
      }else{
        this.error = 'invalid schema';
        this.wizardService.emitStepValidity(false);
      }
    }catch (e){
      this.error = `invalid json. error: ${e}`;
      this.wizardService.emitStepValidity(false);
    }
  }
}
