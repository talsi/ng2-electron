import { Pipe, PipeTransform } from '@angular/core';
import { Route } from "@angular/router";

@Pipe({
  name: 'steps'
})
export class StepsPipe implements PipeTransform {

  transform(routes: Route[], args?: any): any {
    return routes.filter(route => route.path && route.path !== '**');
  }

}
