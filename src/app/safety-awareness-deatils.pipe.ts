import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'safetyAwarenessDeatils'
})
export class SafetyAwarenessDeatilsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
