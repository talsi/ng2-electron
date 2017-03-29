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
    requirements: {
      type: "object",
      properties: {
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
        type: "tabarray",
        title: "APIs",
        items: {
          type: "section",
          items: [
            "requirements.apis[].name",
            {
              type: "array",
              items: [
                "requirements.apis[].params[]"
              ]
            }
          ]
        }
      }
    ]
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
    this.data.requirements.apis.forEach(requirement => {
      requirement.params = requirement.params || [];
    });
  }
}
