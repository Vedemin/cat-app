import { Pipe, PipeTransform } from '@angular/core';
import { DishCardComponent } from '../site-body/offer/dishes/dish-card/dish-card.component';

@Pipe({
  name: 'mealTypeFilter'
})
export class MealTypeFilterPipe implements PipeTransform {

  transform(dishList: any, args: unknown[]): DishCardComponent[] {
    if (!dishList)
      return []
    else if (!args)
      return dishList
    else return dishList.filter(dish => {return args.includes(dish.value.type) })
  }

}
