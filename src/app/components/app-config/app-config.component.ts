import { Component, OnInit, Inject } from '@angular/core';
import { JsonSchema } from '../../interfaces';
import { WizardService, JsonService } from "../../services";

// TODO: remove refs to ajv
// TODO: delete const a
const a = {
  "enabled": true,
  "name": "certProv",
  "page": "Settings",
  "pane": "siteSettings",
  "title": "Certificate Provisioning",
  "dir": "/siteSettings/certProv",
  "defaultRoute": "",
  "menuPosition": 2,
  "autoHideLoadingAnimation": false,
  "mainComponentTag": "<certificate-app></certificate-app>",
  "requirements": {
    "apis": [
      {"name": "admin.getSiteConfig"},
      {"name": "admin.certificates.cancelCurrentRequest"},
      {"name": "admin.certificates.getCurrentRequestStatus"},
      {"name": "admin.certificates.createRequest", "params": ["prefix"]},
      {"name": "admin.certificates.resendVerificationEmails", "params": ["domains"]}
    ],
    "services": [],
    "isParentSite": true
  }
};

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

  constructor(public wizardService: WizardService, @Inject(JsonService) public JSON: JSON) { }

  ngOnInit() {
  }
}
