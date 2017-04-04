import { Injectable, NgZone } from '@angular/core';
import { Observable, Observer } from "rxjs";
import { ICmdOutput } from "../interfaces";

const electron = window['require']('electron');
const spawn = window['require']("child_process").spawn;
const path = window['require']("path");
const fs = window['require']('fs');

@Injectable()
export class NodeApiService {

  constructor(private ngZone: NgZone) { }

  cmd(cmd: string, cwd: string = window['process'].cwd()): Observable<ICmdOutput> {

    cwd = path.normalize(cwd);
    console.log(`invoking cmd "${cmd}" from "${cwd}"`);

    const shell = spawn(cmd, [], {
      cwd: cwd,
      shell: true
    });

    shell.stdout.setEncoding('utf8');
    shell.stderr.setEncoding('utf8');

    return new Observable<ICmdOutput>((o: Observer<ICmdOutput>) => {

      shell.stdout.on('data', (data) => {
        this.ngZone.run(() => {
          console.log(`stdout [${cmd}]: ${data}`);
          o.next({
            type: 'info',
            data: data.replace(/\[\d\dm/g, "")
          });
        });
      });

      shell.stderr.on('data', (data) => {
        this.ngZone.run(() => {
          console.log(`stderr [${cmd}]: ${data}`);
          o.next({
            type: 'error',
            data: data
          });
        });
      });

      shell.on('close', (code) => {
        this.ngZone.run(() => {
          const msg: string = `shell process "${cmd}" exited with code ${code}.`;
          console.log(msg);
          o.complete();
        });
      });

      shell.on('error', (err) => {
        this.ngZone.run(() => {
          const msg: string = `Failed to run shell process "${cmd}". err: ${err || 'Unknown Error'}`;
          console.log(msg);
          o.error(msg);
        });

      });

    }).share();
  }

  isFolderExists(dir: string): boolean{
    return fs.existsSync(path.normalize(dir));
  }

  openExternalBrowser(url: string) {
    electron.shell.openExternal(url);
  }

  readFile(filepath: string): string {
    return fs.readFileSync(filepath, 'utf-8');
  }

  readJSONFile(filepath: string): string {
    return JSON.parse(this.readFile(filepath));
  }

  saveFile(filepath: string, content: string) {
    fs.writeFileSync(filepath, content);
  }

  saveJsonFile(filepath: string, content: any) {
    this.saveFile(filepath, JSON.stringify(content, null, 2));
  }

  appendToFile(filepath: string, content: string) {
    fs.appendFileSync(filepath, content);
  }
}
