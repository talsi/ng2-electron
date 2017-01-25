import { Injectable, NgZone } from '@angular/core';
import { Observable, Observer } from "rxjs";

const spawn = window['require']("child_process").spawn;

@Injectable()
export class NodeApiService {

  constructor(private ngZone: NgZone) { }

  cmd(cmd: string) : Observable<string> {

    console.log(`cmd invoked: "${cmd}"`);

    let shell = spawn(cmd, [], {shell: true});
    shell.stdout.setEncoding('utf8');
    shell.stderr.setEncoding('utf8');

    return new Observable<string>((o: Observer<string>) => {

      shell.stdout.on('data', (data) => {
        this.ngZone.run(() => {
          console.log(`stdout [${cmd}]: ${data}`);
          o.next(data.replace(/\[\d\dm/g, ""));
        });
      });

      shell.stderr.on('data', (data) => {
        this.ngZone.run(() => {
          console.log(`stderr [${cmd}]: ${data}`);
          // o.next(data);
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
}
