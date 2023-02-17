import { Component, OnInit, AfterContentInit } from '@angular/core';
import { DishListServiceService } from 'src/app/services/dish-list-service.service';
import { FilterServiceService } from 'src/app/services/filter-service.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent {
  dishList: any;

  constructor(public filterService: FilterServiceService, public dishListService: DishListServiceService){}

  // ngOnInit() {
  //   this.dishList = this.dishListService.getDishes()
  //   // print(this.dishList)
  // }

  updateDishList($event){
    console.log(this.dishList)
    this.dishListService.setDishes(this.dishList)
  }
}
