import { Component, OnInit, ViewChild } from '@angular/core';
import { AceEditorComponent } from 'ng2-ace-editor';
import { JsonSchema } from '../../interfaces';
import * as ajv from 'ajv';
import { WizardService } from "../../services/wizard.service";
import { JsonSchemaFormComponent } from "angular2-json-schema-form";

const appConfigJsonSchema : JsonSchema = {
  required: ['name', 'age'],
  properties: {
    name: {
      type: 'string',
      minLength: 1
    },
    age: {
      type: 'number'
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
  @ViewChild('form') form: JsonSchemaFormComponent;

  data = {};

  schema: JsonSchema = mySchema;
  text: string = '';
  error: string = '';

  constructor(private wizardService: WizardService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.editor.getEditor().$blockScrolling = Infinity;
  }

  onFormInputChanges(data){
    let text = JSON.stringify(data, null, 4);
    if(this.text !== text){
      this.text = text;
      //this.data = data;
      console.log(`onChanges: ${text}`);
      this.editor.getEditor().setValue(text);
      this.editor.getEditor().clearSelection();
    }
  }

  onSubmit(data){
    console.log(`onSubmit: ${JSON.stringify(data, null, 4)}`);
  }

  onJsonEditorTextChanged(text){
    let isValid = this.validate(text);
    if(isValid){
      if(this.text !== text){
        this.text = text;
        this.data = JSON.parse(text);
      }
    }
  }

  private validate(text){
    try{
      if(jsonValidator(JSON.parse(text))){
        this.error = '';
        this.wizardService.emitStepValidity(true);
        return true;
      }else{
        this.error = 'invalid schema';
        this.wizardService.emitStepValidity(false);
        return false;
      }
    }catch (e){
      this.error = `invalid json. error: ${e}`;
      this.wizardService.emitStepValidity(false);
      return false;
    }
  }
}
