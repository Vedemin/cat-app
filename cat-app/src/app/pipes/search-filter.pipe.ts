import { Pipe, PipeTransform } from '@angular/core';
import { DishCardComponent } from '../site-body/offer/dishes/dish-card/dish-card.component';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(dishList: any, text: string): DishCardComponent[] {
    if (!dishList)
      return []
    else if (!text)
      return dishList
    else {
      text = text.toLowerCase();
      return dishList.filter(dish => {return dish.key.toLowerCase().includes(text);
    });
    }
  }

}
