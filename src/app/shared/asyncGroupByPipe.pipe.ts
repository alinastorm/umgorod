
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'console'
})
export class ConsolePipe implements PipeTransform {
  constructor() { }
  transform(value: any, marker: string): any {
    console.log("ConsolePipe -> ------------>" + marker + ':', value)
    return value;
  }
}