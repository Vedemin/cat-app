import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isMeatIncluded'
})
export class IsMeatIncludedPipe implements PipeTransform {

  transform(dishList: any, args: string[]): unknown {
    if (!dishList)
      return [];
    else if (!args)
      return dishList
    else
      return dishList.filter(dish => {return args.includes(dish.value.meat)})
  }

}
