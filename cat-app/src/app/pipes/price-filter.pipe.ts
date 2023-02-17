import { Pipe, PipeTransform } from '@angular/core';
import { DishCardComponent } from '../site-body/offer/dishes/dish-card/dish-card.component';

@Pipe({
  name: 'priceFilter'
})
export class PriceFilterPipe implements PipeTransform {

  transform(dishList: any, minValue:number, maxValue:number): DishCardComponent[] {
    if (!dishList)
      return []
    else if (!minValue || !maxValue)
      return dishList
    else return dishList.filter(dish => {
      return (maxValue >= dish.value.price && dish.value.price >= minValue)
    })
  }

}
