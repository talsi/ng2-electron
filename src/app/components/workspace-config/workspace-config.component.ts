import { Component, OnInit } from '@angular/core';
import { WizardService } from '../../services';
import { NodeApiService } from '../../services/node.service';

@Component({
  selector: 'app-workspace-config',
  templateUrl: './workspace-config.component.html',
  styleUrls: ['./workspace-config.component.css']
})
export class WorkspaceConfigComponent implements OnInit {

  path: string;
  error: string;
  configFolder: string;

  constructor(private wizardService: WizardService,
              private node: NodeApiService) { }

  ngOnInit() {
    const path = localStorage.getItem('workspace');
    if(path){
      this.setPath(path);
      this.verifyWorkspace();
    }
  }

  onChange(path){
    localStorage.setItem('workspace', path);
    this.setPath(path);
    this.verifyWorkspace();
  }

  private verifyRepository(url: string){
    if(this.wizardService.getInfraRepositoryURL().toLowerCase().trim() === url.toLowerCase().trim()){
      this.error = 'OK';
      this.wizardService.emitStepValidity(true);
    }else{
      this.error = 'Wrong repo';
      this.wizardService.emitStepValidity(false);
    }
  }

  // TODO: check if folder already exists => display confirm dialog
  cloneConfigRepo(){
    this.node.cmd(`git clone ${this.wizardService.getInfraRepositoryURL()} config`, this.path).subscribe(
      output => {
        console.log(output);
        this.error = 'OK';
      },
      err => this.error = err,
      () => console.log(`git clone ${this.wizardService.getInfraRepositoryURL()} config completed`)
    );
  }

  private setPath(path: any) {
    this.path = path;
    this.configFolder = `${path}/config`;
  }

  // 1. check if we have config folder
  // 2. check if config folder is actually the config repo
  private verifyWorkspace() {
    if(this.node.isFolderExists(this.configFolder)) {
      this.node.cmd('git config --get remote.origin.url', this.configFolder).subscribe(
        output => this.verifyRepository(output.data),
        err => this.error = err,
        () => console.log('git config --get remote.origin.url completed')
      );
    }else{
      this.error = 'config folder does not exist';
      this.wizardService.emitStepValidity(false);
    }
  }
}
