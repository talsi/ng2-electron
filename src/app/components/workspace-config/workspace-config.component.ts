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
  }

  onChange(path){
    this.path = path;
    this.configFolder = `${path}/config`;
    if(this.node.isFolderExists(this.configFolder)) {
      this.node.cmd('git config --get remote.origin.url', this.configFolder).subscribe(
        output => this.verifyRepository(output.data),
        err => this.error = err,
        () => console.log('git config --get remote.origin.url completed')
      );
    }else{
      this.error = 'config folder does not exist';
    }
  }

  private verifyRepository(url: string){
    if(this.wizardService.getInfraRepositoryURL().toLowerCase().trim() === url.toLowerCase().trim()){
      this.error = 'OK';
    }else{
      this.error = 'Wrong repo';
    }
  }

  // TODO: check if folder already exsits => display confirm dialog
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
}
