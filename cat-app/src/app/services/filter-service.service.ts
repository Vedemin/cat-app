import {Injectable, OnInit} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterServiceService{

  public query : string
  public maxPrice: number
  public minPrice: number
  public selectedTypesOfMeals: string []
  public selectedTypesOfCuisine: string []
  public selectedMeatInclusion: string[]
  public currentCurrency: string[]
  minRating: 1;
  maxRating: 5;

  constructor() {

  }
  setString(str: string){
    this.query = str
  }
}
