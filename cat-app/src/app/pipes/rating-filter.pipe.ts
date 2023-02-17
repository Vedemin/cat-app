import { Pipe, PipeTransform } from '@angular/core';
import { DishCardComponent } from '../site-body/offer/dishes/dish-card/dish-card.component';

@Pipe({
  name: 'ratingFilter'
})
export class RatingFilterPipe implements PipeTransform {

  transform(dishList: any, minValue:number, maxValue:number): DishCardComponent[] {
    if (!dishList)
      return []
    else if (!minValue || !maxValue)
      return dishList
    else return dishList.filter(dish => {return (maxValue >= dish.value.rating && dish.value.rating >= minValue)
    })
  }

}
