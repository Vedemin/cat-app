import { KeyValuePipe } from '@angular/common';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DishListServiceService implements OnInit {
  private dishes: any
  unavailable = new Set<string>()
  constructor() {
  }

  ngOnInit(): void {
    this.dishes = {}
  }

  modDish(name: string, parameter: string, value: any) {
    this.dishes[name][parameter] = value
  }

  setDishes(dishes: any){
    console.log("Attempting dish update")
    this.dishes = dishes
    for(const dishNumber in this.dishes){
      if(this.dishes[dishNumber].inStock <= 0){
        this.unavailable.add(this.dishes[dishNumber].name)
      }
      this.dishes[dishNumber].ordered ||= 0
    }
    console.log(this.getDishes())
    console.log("Dishes updated")
  }

  getDishes(){
    return this.dishes
  }

  getTypesOfMeals(){
    if(this.dishes){
      return Array.from(new Set(Object.keys(this.dishes).map(k => this.dishes[k].type)))
    }
    else return []
  }

  getTypesOfCuisine(){
    if(this.dishes){
      return Array.from(new Set(Object.keys(this.dishes).map(k => this.dishes[k].cuisine)))
    }
    else return []
  }

  getMeatInclusion(){
    if(this.dishes){
      return Array.from(new Set(Object.keys(this.dishes).map(k => this.dishes[k].meat)))
    }
    else return []
  }

  getMinPrice(){
    if(this.dishes){
      return Array.from(new Set(Object.keys(this.dishes).map(k => this.dishes[k].price))).map(x=>Number(x)).sort((n1,n2) => n1-n2)[0]
      }
    else return 0
    }

  getMaxPrice(){
    if(this.dishes){
    return Array.from(new Set(Object.keys(this.dishes).map(k => this.dishes[k].price))).map(x=>Number(x)).sort((n1,n2) => n2-n1)[0] || 0
    }
    else return 0
  }

  getMinRating(){
      if(this.dishes){
        return Array.from(new Set(Object.keys(this.dishes).map(k => this.dishes[k].rating))).map(x=>Number(x)).sort((n1,n2) => n1-n2)[0] || 0
      }
      else return 0
  }

  getMaxRating(){
        if(this.dishes){
          return Array.from(new Set(Object.keys(this.dishes).map(k => this.dishes[k].rating))).map(x=>Number(x)).sort((n1,n2) => n2-n1)[0]
        }
        else return 0
  }

  getDish(id: any) {
    return this.dishes[id]
  }

  deleteDish(id:any){
    delete this.dishes[id]
  }
}
