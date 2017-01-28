import { Injectable } from '@angular/core';
import { Observable, Observer } from "rxjs";

@Injectable()
export class WizardService {

  private observer: Observer<boolean>;
  public stepVaild = new Observable<boolean>((o: Observer<boolean>) => {this.observer = o }).share();

  constructor() { }

  emit(isValid: boolean) {
    this.observer.next(isValid);
  }
}
