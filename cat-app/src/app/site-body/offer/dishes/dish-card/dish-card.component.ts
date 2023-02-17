import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.css']
})
export class DishCardComponent {
  @Input() dish: any
  key: string
  name: string
  currency: string
  description: string
  ingredients: Array<string>
  meat_inclusion: string
  price: number
  type_of_cuisine: string
  type_of_meal: string
  photo_links: Array<string>
  @Input() currentCurrency = 'USD'
  @Output() orderUpdate = new EventEmitter();
  isPlusButtonVisible : boolean ;
  isMinusButtonVisible : boolean ;
  @Input() isMaximumPrice: boolean;
  @Input() isMinimumPrice: boolean;
  @Output() deleteEmitter = new EventEmitter()
  starRating: number;
  constructor(private router: Router, public userService: UserService) {}

  ngOnInit() {
    this.name = this.dish.key
    this.description = this.dish.value.description
    this.ingredients = this.dish.value.ingredients
    this.meat_inclusion = this.dish.value.meat_inclusion
    this.price = Number(this.dish.value.price)
    this.type_of_cuisine = this.dish.value.type_of_cuisine
    this.type_of_meal = this.dish.value.type_of_meal
    this.photo_links = this.dish.value.photo_links
    this.isPlusButtonVisible = this.dish.value.inStock > 0
    this.isMinusButtonVisible = this.dish.value.ordered > 0
  }

  onPlusClick() {
    if (this.dish.value.inStock != 0) {
      this.isMinusButtonVisible = true
      console.log({key:this.dish.key, character: "+"})
      // this.orderUpdate.emit({key:this.key, name: this.name, character: "+"})
      this.userService.addToBasket(this.dish.key, this.price)
      // this.basketService.
      if (this.dish.value.inStock == 0)
        this.isPlusButtonVisible = false
    }
  }

  onMinusClick() {
      this.isPlusButtonVisible = true
      console.log({key:this.key, name: this.name, character: "-"})
      // this.orderUpdate.emit({key:this.key, name: this.name, character: "-"})
      let a = this.userService.removeFromBasket(this.dish.key)
      if (a == 0)
        this.isMinusButtonVisible = false
  }
  chooseColorOfBackground() {
    if (!this.isPlusButtonVisible) {
      return 'red'
    }
    if (this.dish.value.inStock <= 3) {
      return 'orange'
    } else {
      return 'antiquewhite'
    }
  }
  deleteComponent() {
    console.log("Attempting to delete")
    this.deleteEmitter.emit({key:this.name, ordered:this.dish.value.ordered, name:this.dish.key})
  }

  onClick() {
    console.log(this.name)
    this.router.navigate(['Dish', this.name])
  }
}
