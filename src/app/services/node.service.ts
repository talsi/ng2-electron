import { Injectable, NgZone } from '@angular/core';
import { Observable, Observer } from "rxjs";
import { ICmdOutput } from "../interfaces";

const electron = window['require']('electron');
const spawn = window['require']("child_process").spawn;
const userHomeDir = window['process'].env[(window['process'].platform == 'win32') ? 'USERPROFILE' : 'HOME'];

@Injectable()
export class NodeApiService {

  constructor(private ngZone: NgZone) { }

  cmd(cmd: string) : Observable<ICmdOutput> {

    console.log(`cmd invoked: "${cmd}"`);
    console.log(`cwd: ${userHomeDir}`);

    let shell = spawn(cmd, [], {
      cwd: userHomeDir,
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

  openExternalBrowser(url: string) {
    electron.shell.openExternal(url);
  }
}
