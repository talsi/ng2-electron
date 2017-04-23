import { Component, OnInit, Inject } from '@angular/core';
import { JsonService, WizardService, NodeApiService } from '../../services';
import * as lodash from 'lodash';
import * as keyarrange from 'lodash-keyarrange';

const _: any = lodash.mixin(keyarrange);

@Component({
  selector: 'app-generate-app',
  templateUrl: './generate-app.component.html',
  styleUrls: ['./generate-app.component.css']
})
export class GenerateAppComponent implements OnInit {

  appDir: string;

  constructor(public wizardService: WizardService,
              private node: NodeApiService,
              @Inject(JsonService) public JSON: JSON) { }

  ngOnInit() {

    // TODO: delete inital data
    // this.wizardService.saveAppConfig({
    //   "enabled": true,
    //   "name": "etl-app",
    //   "title": "ETL Data Flows",
    //   "page": "settings",
    //   "pane": "nexus",
    //   "menuPosition": 1,
    //   "defaultRoute": "dataFlow",
    //   "dir": "etl-app/dist",
    //   "mainComponentTag": "<etl-app></etl-app>",
    //   "autoHideLoadingAnimation": false,
    //   "requirements": {
    //     "apis": [
    //       {
    //         "name": "idx.search",
    //         "params": [
    //           "query"
    //         ]
    //       },
    //       {
    //         "name": "idx.createScheduling",
    //         "params": [
    //           "data"
    //         ]
    //       },
    //       {
    //         "name": "idx.getScheduling",
    //         "params": [
    //           "id"
    //         ]
    //       },
    //       {
    //         "name": "idx.setScheduling",
    //         "params": [
    //           "data"
    //         ]
    //       },
    //       {
    //         "name": "idx.deleteScheduling",
    //         "params": [
    //           "id"
    //         ]
    //       },
    //       {
    //         "name": "idx.createDataflow",
    //         "params": [
    //           "data"
    //         ]
    //       },
    //       {
    //         "name": "idx.getDataflow",
    //         "params": [
    //           "id"
    //         ]
    //       },
    //       {
    //         "name": "idx.setDataflow",
    //         "params": [
    //           "data"
    //         ]
    //       },
    //       {
    //         "name": "idx.deleteDataflow",
    //         "params": [
    //           "id"
    //         ]
    //       }
    //     ],
    //     "services": []
    //   }
    // });
    // this.wizardService.saveWorkspaceDir('D:\\dvlp\\apps-refactor');
  }

  createApp(){
    this.saveAppConfig();
    this.createAngularApp();
  }

  private saveAppConfig() {
    const workspaceDir = this.wizardService.getWorkspaceDir();
    const filepath = `${workspaceDir}\\apps-config\\apps.json`;

    // read file
    const appsConfig: any = this.node.readJSONFile(filepath);

    const apps: any[] = appsConfig.apps;
    const newApp = this.wizardService.getAppConfig();
    apps.push(newApp);

    // write file
    this.node.saveJsonFile(filepath, appsConfig);
  }

  private createAngularApp() {
    const workspaceDir = this.wizardService.getWorkspaceDir();
    const newApp = this.wizardService.getAppConfig();
    this.node.cmd(`ng new ${newApp.name} --skip-install`, workspaceDir).subscribe(
      data => console.log(data),
      err => console.log(err),
      () => {
        console.log(`[complete]: ng new ${newApp.name} --skip-install`);
        this.modifyGeneratedFiles();
        this.gitCommit();
        this.npmInstall();
      }
    );
  }

  private modifyGeneratedFiles() {

    const workspaceDir = this.wizardService.getWorkspaceDir();
    const newApp = this.wizardService.getAppConfig();
    this.appDir = `${workspaceDir}\\${newApp.name}`;

    // .angular-cli.json
    console.log('modifying ".angular-cli.json"');
    this.addEnvHMR();

    // .gitignore
    console.log('modifying ".gitignore"');
    this.modifyGitIgnore();

    // package.json
    console.log('modifying "package.json"');
    this.modifyPackageJson();

    // proxy.conf.json
    console.log('creating "proxy.conf.json"');
    this.createProxyConfig();

    // bootstrap.ts
    console.log('creating "bootstrap.ts"');
    this.createBootstrapFile();

    // hmr.ts
    console.log('creating "hmr.ts"');
    this.createHmrFile();

    // main.ts
    console.log('modifying "main.ts"');
    this.overwriteMainFile();

    // polyfills.ts
    console.log('modifying "polyfills.ts"');
    this.overwritePolyfillsFile();

    // test.ts
    console.log('modifying "test.ts"');
    this.overwriteTestFile();

    // typings.d.ts
    console.log('modifying "typings.d.ts"');
    this.overwriteTypingsFile();

    // environment.hmr.ts
    // environment.prod.ts
    // environment.ts
    console.log('modifying "environment.hmr.ts"');
    console.log('modifying "environment.prod.ts"');
    console.log('modifying "environment.ts"');
    this.overwriteEnvFiles();

    // app.component.ts
    console.log('modifying "app.component.ts"');
    this.overwriteAppComponentFile();

    // web.config
    console.log('creating "web.config"');
    this.createWebConfigFile();

    // karma.conf.js
    console.log('modifying "karma.conf.js"');
    this.modifyKarmaConfigFile();
  }

  private addEnvHMR() {
    const filepath = `${this.appDir}\\.angular-cli.json`;
    const ngConfigFile: any = this.node.readJSONFile(filepath);
    ngConfigFile.apps[0].environments.hmr = "environments/environment.hmr.ts";
    this.node.saveJsonFile(filepath, ngConfigFile);
  }

  private modifyGitIgnore() {
    this.node.appendToFile(`${this.appDir}\\.gitignore`,
`/web.config
/.chrome`);
  }

  private modifyPackageJson() {
    const filepath = `${this.appDir}\\package.json`;
    const packageJson: any = this.node.readJSONFile(filepath);
    packageJson.scripts.hmr = "ng serve --hmr -e=hmr --ssl --proxy-config=proxy.conf.json";
    packageJson.scripts.release = "ng build --prod --aot --extract-css=false --output-hashing=none";
    packageJson.devDependencies["@angularclass/hmr"] = "1.2.2";
    packageJson.dependencies["zone.js"] = "0.8.5";
    packageJson.devDependencies = _.keyArrange(packageJson.devDependencies);
    this.node.saveJsonFile(filepath, packageJson);
  }

  private createProxyConfig() {
    const webPackProxyConfig = {
      "/dist": {
        "secure": false,
        "target": "https://localhost:4200/",
        "pathRewrite": {
          "^/dist": ""
        }
      }
    }
    this.node.saveJsonFile(`${this.appDir}\\proxy.conf.json`, webPackProxyConfig);
  }

  private createBootstrapFile() {
    this.node.saveFile(`${this.appDir}\\src\\bootstrap.ts`, `
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {NgModuleRef} from "@angular/core";
import {environment} from "./environments/environment";
import {AppModule} from "./app/app.module";
import {Router} from "@angular/router";
import {hmrBootstrap} from './hmr';

const bootstrapModule = () => {
  return platformBrowserDynamic().bootstrapModule(AppModule)
    .then((appModule: NgModuleRef<AppModule>) => {
      appModule.onDestroy(() => {
        let router: Router;
        try { router = appModule.injector.get(Router); } catch (e) {} finally {
          if (router) { router.dispose(); }
        }
      });
      return appModule;
    });
};

const bootstrapWrapper = (module) => {
  if (environment.hmr) {
    if (module['hot']) {
      return hmrBootstrap(module, bootstrapModule);
    } else {
      console.error('HMR is not enabled for webpack-dev-server!');
      console.log('Are you using the --hmr flag for ng serve?');
    }
  } else {
    return bootstrapModule();
  }
};

const registerModule = (module) => {
  /** If you have external scripts (defined in project’s “angular-cli.json”) uncomment "scripts.bundle.js" below **/
  window.System.registerDynamic([/*"scripts.bundle.js"*/], true, function(require, exports, system_module) {
    window.appsManager.registeredAppModules[system_module.id] = true;
    system_module.exports = {
      id: system_module.id,
      start: () => bootstrapWrapper(module)
    };
  });
};

export const bootstrap = (module: any) => {

  const activeAppID = window.appsManager.getActiveAppID();
  const registeredModules = window.appsManager.registeredAppModules;

  if (activeAppID && registeredModules[activeAppID]) {
    bootstrapWrapper(module);
  } else {
    registerModule(module);
  }
};`);
  }

  private createHmrFile() {
    this.node.saveFile(`${this.appDir}\\src\\hmr.ts`, `
import { NgModuleRef, ApplicationRef } from '@angular/core';
import { createNewHosts } from '@angularclass/hmr';

// webpack public path
__webpack_require__.p = "https://localhost:4200/";

let ngModule: NgModuleRef<any>;

const disposeHandler = () => {
  let appRef: ApplicationRef = ngModule.injector.get(ApplicationRef);
  let elements = appRef.components.map(c => c.location.nativeElement);
  let makeVisible = createNewHosts(elements);
  ngModule.destroy();
  makeVisible();
};

export const hmrBootstrap = (module: any, bootstrap: () => Promise<NgModuleRef<any>>) : Promise<NgModuleRef<any>> => {
  return new Promise((resolve, reject) => {
    module.hot.accept();
    bootstrap().then(mod => {
      ngModule = mod;
      resolve(ngModule);
    });
    if(ngModule){
      module.hot.removeDisposeHandler(disposeHandler);
    }
    module.hot.dispose(disposeHandler);
  });
};`);
  }

  private overwriteMainFile() {
    this.node.saveFile(`${this.appDir}\\src\\main.ts`, `
import {enableProdMode} from "@angular/core";
import {environment} from "./environments/environment";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {AppModule} from "./app/app.module";
import {bootstrap} from "./bootstrap";

if (environment.production) {
  enableProdMode();
}

/** actual dynamic bootstrap logic **/
bootstrap(module);

/** workaround for webpack - searching for statically analyzable bootstrap code. **/
let FALSE;
if (FALSE) {
  platformBrowserDynamic().bootstrapModule(AppModule);
}`);
  }

  private overwritePolyfillsFile() {
    this.node.saveFile(`${this.appDir}\\src\\polyfills.ts`, `
/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
 * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
 *
 * Learn more in https://angular.io/docs/ts/latest/guide/browser-support.html
 */

/***************************************************************************************************
 * BROWSER POLYFILLS
 */

/** IE9, IE10 and IE11 requires all of the following polyfills. **/
// import 'core-js/es6/symbol';
// import 'core-js/es6/object';
// import 'core-js/es6/function';
// import 'core-js/es6/parse-int';
// import 'core-js/es6/parse-float';
// import 'core-js/es6/number';
// import 'core-js/es6/math';
// import 'core-js/es6/string';
// import 'core-js/es6/date';
// import 'core-js/es6/array';
// import 'core-js/es6/regexp';
// import 'core-js/es6/map';
// import 'core-js/es6/set';

/** IE10 and IE11 requires the following for NgClass support on SVG elements */
// import 'classlist.js';  // Run 'npm install --save classlist.js'.

/** IE10 and IE11 requires the following to support '@angular/animation'. */
// import 'web-animations-js';  // Run 'npm install --save web-animations-js'.


/** Evergreen browsers require these. **/
import 'core-js/es6/reflect';
import 'core-js/es7/reflect';


/** ALL Firefox browsers require the following to support '@angular/animation'. **/
// import 'web-animations-js';  // Run 'npm install --save web-animations-js'.



/***************************************************************************************************
 * Zone JS is required by Angular itself.
 */
// import 'zone.js/dist/zone';  // Included with Angular CLI.



/***************************************************************************************************
 * APPLICATION IMPORTS
 */

/**
 * Date, currency, decimal and percent pipes.
 * Needed for: All but Chrome, Firefox, Edge, IE11 and Safari 10
 */
// import 'intl';  // Run 'npm install --save intl'.`);
  }

  private overwriteTestFile() {
    this.node.saveFile(`${this.appDir}\\src\\test.ts`, `
// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone';  // Included with Angular CLI.
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// Unfortunately there's no typing for the '__karma__' variable. Just declare it as any.
declare var __karma__: any;
declare var require: any;

// Prevent Karma from running prematurely.
__karma__.loaded = function () {};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./', true, /\\.spec\\.ts$/);
// And load the modules.
context.keys().map(context);
// Finally, start Karma to run the tests.
__karma__.start();
`);
  }

  private overwriteTypingsFile() {
    this.node.saveFile(`${this.appDir}\\src\\typings.d.ts`, `
/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface Window {
  System: any;
  site: any;
  appsManager: any;
}

declare var window: Window;

// needed for HMR
declare var __webpack_require__: any;

declare const System: any; // For tests.`);
  }

  private overwriteEnvFiles() {

    // environment.hmr.ts
    this.node.saveFile(`${this.appDir}\\src\\environments\\environment.hmr.ts`, `
export const environment = {
  production: false,
  hmr: true
};`);

    // environment.prod.ts
    this.node.saveFile(`${this.appDir}\\src\\environments\\environment.prod.ts`, `
export const environment = {
  production: true,
  hmr: false
};`);

    // environment.ts
    this.node.saveFile(`${this.appDir}\\src\\environments\\environment.ts`, `
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses 'environment.ts', but if you do
// 'ng build --env=prod' then 'environment.prod.ts' will be used instead.
// The list of which env maps to which file can be found in '.angular-cli.json'.

export const environment = {
  production: false,
  hmr: false
};`);
  }

  private overwriteAppComponentFile() {
    this.node.saveFile(`${this.appDir}\\src\\app\\app.component.ts`, `
import { Component } from '@angular/core';

@Component({
  selector: '${this.wizardService.getAppConfig().name}',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
}`);
  }

  private createWebConfigFile() {
    this.node.saveFile(`${this.appDir}\\web.config`,
`<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <httpRedirect enabled="false" destination="https://localhost:4200/" />
    </system.webServer>
</configuration>`);
  }

  private modifyKarmaConfigFile() {
    this.node.saveFile(`${this.appDir}\\karma.conf.js`,
`// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

var path = require('path');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    files: [
      { pattern: './src/test.ts', watched: false }
    ],
    preprocessors: {
      './src/test.ts': ['@angular/cli']
    },
    mime: {
      'text/x-typescript': ['ts','tsx']
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: config.angularCli && config.angularCli.codeCoverage
              ? ['progress', 'coverage-istanbul']
              : ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    // Chrome will open dev tools on launch and will save its settings
    customLaunchers: {
      ChromeCustom: {
        base: 'Chrome',
        flags: [
          '--auto-open-devtools-for-tabs'
        ],
        chromeDataDir : path.resolve(__dirname, '.chrome')
      }
    },
    browsers: ['ChromeCustom'],
    singleRun: false
  });
};`);
  }

  private npmInstall() {
    this.node.cmd('npm i', this.appDir).subscribe(
      data => console.log(data),
      err => console.log(err),
      () => console.log('npm i completed')
    );
  }

  private gitCommit() {
    this.node.cmd(`git add -A && git commit -m "initial commit from gigya-cli" --author="Gigya CLI <gigya-cli@console.apps>"`, this.appDir).subscribe(
      data => console.log(data),
      err => console.log(err),
      () => console.log(`git add -A && git commit -m "initial commit" --author="Gigya CLI" completed`)
    );
  }
}
