import { Component, Input, Output, EventEmitter, OnInit, AfterContentInit } from '@angular/core';
import { DishListServiceService } from 'src/app/services/dish-list-service.service';
import { BasketServiceService } from 'src/app/services/basket-service.service';
import { getDatabase, ref, remove } from "firebase/database";

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent {

  p: number = 1;
  @Input() dishList_filtered;
  totalNumberOfOrderedMeals = 0
  selectedCurrency: any
  setOfUnavailable = new Set<string>()
  @Output() listUpdate = new EventEmitter();

  constructor(public dishListService: DishListServiceService, public basketService : BasketServiceService ) {
  }

  // ngOnInit(){
  //   console.log("Dishes loaded!")
  //   this.dishList_filtered = this.dishListService.getDishes()
  //   console.log(this.dishList_filtered)
  // }

  sortList() {
    const arrayObject = this.dishList_filtered.map(dish => dish.value)
    return arrayObject.filter(x =>{return !this.setOfUnavailable.has(x['name'])}).sort((a, b) => ((Number(a['price'])) < (Number(b['price']))) ? -1 : 1)
  }

  getMinPriceDish() {
    return this.sortList()[0]
  }

  isMinPriceDish(dish: any) {
    return dish.key === this.getMinPriceDish()['name'];
  }

  getMaxPriceDish() {
    const list = this.sortList()
    return list[list.length - 1]
  }

  isMaxPriceDish(dish: any) {
    return dish.key === this.getMaxPriceDish()['name'];
  }

  updateOrder($event: any) {
    if ($event['character'] == "+") {
      this.totalNumberOfOrderedMeals += 1
      this.dishListService.getDish($event.key).inStock--;
      this.dishListService.getDish($event.key).ordered++

      if (this.dishListService.getDish($event.key).inStock <= 0) {
        this.dishListService.unavailable.add(this.dishListService.getDish($event.key).name)
      }
    }
   if ($event['character'] == "-") {
     this.totalNumberOfOrderedMeals -= 1
     this.dishListService.getDish($event.key).inStock++;
     this.dishListService.getDish($event.key).ordered--;
     if(this.dishListService.getDish($event.key).inStock > 0){
       this.dishListService.unavailable.delete(this.dishListService.getDish($event.key).name)
     }
   }

    this.listUpdate.emit(true)
    this.basketService.updateDish($event.key,this.dishListService.getDish($event.key).name, this.dishListService.getDish($event.key).ordered, this.dishListService.getDish($event.key).price, this.selectedCurrency||'USD')
  }
  deleteCard($event: any) {
    const db = getDatabase();
    const tasksRef = ref(db, "/dishes/"+ $event.key);
    remove(tasksRef).then(() => {
      this.dishListService.deleteDish($event.key)
      this.basketService.deleteFromBasket($event.name)
    });
  }
}
