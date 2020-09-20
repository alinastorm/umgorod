
import { Pipe, PipeTransform } from '@angular/core';
import { groupBy } from "lodash";
// import * as _ from 'lodash'

@Pipe({
  name: 'asyncGroupBy'
})
export class AsyncGrouPipe implements PipeTransform {

  transform(value1: Array<any>, key?: string): Array<any> {
    if (value1) {
      let newcars = {}
      let newData = []
      value1.forEach((item) => {

        newcars[item.city] ? // check if that array exists or not in newcars object
          newcars[item.city].push({ id: item.id })  // just push
          : (newcars[item.city] = [], newcars[item.city].push({ model: item.id })) // create a new array and push
      })
      newData.push(newcars)
      return newData
    }
  }
}