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
      title: "App Name",
      description: "will be suffixed with \"-app\"",
      required: true
    },
    title: {
      type: "string",
      title: "Title",
      description: "will be displayed on the menu item",
      required: true
    },
    page: {
      type: "string",
      title: "Page",
      enum: ["settings", "admin"],
      default: "settings"
    },
    pane: {
      type: "string",
      title: "Menu Pane",
      enum: [ "siteSettings", "nexus" ],
      required: true
    },
    menuPosition: {
      type: "integer",
      minimum: 1,
      title: "Menu Position",
      description: "defaults to bottom of menu pane (last)"
    },
    defaultRoute: {
      type: "string",
      title: "Default Route",
      description: "If your app uses routing - this will be the initial route",
    },
    autoHideLoadingAnimation: {
      type: "boolean",
      title: "Enabled",
      default: true,
      description: "automatically hides the loading animation once the app loads",
    },
    requirements: {
      type: "object",
      properties: {
        apis: {
          type: "array",
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

const form = [
  "enabled",
  "name",
  "title",
  "page",
  {
    key: "pane",
    options: {
      "siteSettings": "Site Settings",
      "nexus": "IDX"
    }
  },
  "menuPosition",
  "defaultRoute",
  {
    title: "Requirements",
    type: "section",
    items: [
      {
        type: "tabarray",
        title: "API",
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

  jsonSchemaForm = {
    schema: schema,
    form: form
  };

  data: any;
  defaults = {
    enabled: true,
    dir: '',
    name: '',
    page: '',
    pane: '',
    defaultRoute: "",
    mainComponentTag: "",
    autoHideLoadingAnimation: false,
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

    if(this.data.name){
      if(!this.data.name.endsWith('-app')){
        this.data.name = `${this.data.name}-app`;
      }
      this.data.dir = `${this.data.name}/dist`;
      this.data.mainComponentTag = `<${this.data.name}></${this.data.name}>`;
    }

    this.wizardService.saveAppConfig(this.data);
  }
}
