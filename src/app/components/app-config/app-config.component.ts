import { Component, OnInit, Inject } from '@angular/core';
import { WizardService, JsonService } from "../../services";
import * as lodash from 'lodash';

// TODO: remove refs to ajv
// TODO: delete const a

const schema = {
  type: "object",
  properties: {
    enabled: {
      type: "boolean",
      title: "Enabled",
      default: true
    },
    name: {
      type: "string",
      title: "Name",
      required: true
    },
    page: {
      type: "string",
      title: "Page",
      enum: ["settings", "admin"],
      default: "settings"
    },
    apis: {
      type: "array",
      title: "APIs",
      items: {
        type: "object",
        title: "API",
        properties: {
          name: {
            type: "string",
            title: "name",
            required: true
          },
          params: {
            type: "array",
            items: {
              type: "string",
              title: "Param"
            }
          }
        }
      }
    }
  }
};

const friends = {
  "type": "array",
    "items": {
    "type": "object",
      "title": "Friend",
      "properties": {
      "nick": {
        "type": "string",
          "title": "Nickname",
          "required": true
      },
      "gender": {
        "type": "string",
          "title": "Gender",
          "enum": [ "male", "female", "alien" ]
      },
      "age": {
        "type": "integer",
          "title": "Age"
      }
    }
  }
};

const layout = [
  "enabled",
  "name",
  "page",
  {
    title: "Requirements",
    type: "section",
    items: [
      {
        type: "array",
        title: "APIs",
        items: {
          type: "section",
          items: [
            "apis[].name",
            {
              type: "array",
              items: [
                "apis[].params[]"
              ]
            }
          ]
        }
      }
    ]
  }
];

const formz = [
  {
    "type": "array",
    "items": {
      "type": "section",
      "items": [
        "friends[].nick",
        {
          "type": "array",
          "items": [
            "friends[].animals[]"
          ]
        }
      ]
    }
  }
];

@Component({
  selector: 'app-app-config',
  templateUrl: 'app-config.component.html',
  styleUrls: ['app-config.component.css']
})
export class AppConfigComponent implements OnInit {

  data: any;
  schema = schema;
  layout = layout;
  defaults = {
    enabled: true,
    name: '',
    page: 'Settings',
    requirements: {
      apis: [],
      services: []
    }
  };

  constructor(public wizardService: WizardService, @Inject(JsonService) public JSON: JSON) { }

  ngOnInit() {
  }

  onChanges(ev){
    this.data = lodash.defaultsDeep(ev, this.defaults);
  }
}
