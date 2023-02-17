import { Injectable } from '@angular/core';

interface DishInterface{
  name: string;
  inStock: number;
  price: number;
  currency: string;
  totalPrice: number;
}

@Injectable({
  providedIn: 'root'
})

export class BasketServiceService {

  public inBasket:{ [name:string] : DishInterface}

  // addToBasket()

  updateDish(key: string, name: string, inStock: number, price: number, currency: string){
    this.inBasket[key] = {name, inStock, price, currency, totalPrice : inStock * price}
  }

  getDishes(){
    return this.inBasket
  }

  constructor() {
    this.inBasket = {}
  }

  countAllDishes(){
    let count = 0
    for (const dish in this.inBasket){
      count += this.inBasket[dish].inStock
    }
    return count
  }
  countTotalPrice(){
    let full_price = 0
    for (const dish in this.inBasket){
      full_price += this.inBasket[dish].price
    }
    return full_price
  }

  deleteFromBasket(name: string){
    delete this.inBasket[name]
    console.log(this.countAllDishes())
  }
}
