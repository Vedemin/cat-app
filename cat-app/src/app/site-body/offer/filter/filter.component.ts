import { Component, OnInit, AfterContentInit } from '@angular/core';
import { FilterServiceService } from "../../../services/filter-service.service";
import { DishListServiceService } from "../../../services/dish-list-service.service";
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent  implements OnInit, AfterContentInit{
  query: any;
  mealType: any;
  public dropdownSettingsMealType :IDropdownSettings = {};
  cuisine: any;
  minPrice: any;
  maxPrice: any;
  meat: any;
  minRating: any;
  maxRating: any;
  constructor(private filterService: FilterServiceService, public dishListService: DishListServiceService) {
  }

  ngAfterContentInit() {
    this.maxPrice = this.dishListService.getMaxPrice()
    this.minPrice = this.dishListService.getMinPrice()
    this.maxRating = this.dishListService.getMaxRating()
    this.minRating = this.dishListService.getMinRating()
  }

  ngOnInit() {
    console.log("Filter loaded!")
    this.dropdownSettingsMealType = {
      singleSelection: false,
      idField: 'id',
      textField: 'text',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 5,
      allowSearchFilter: false
    };
  }

  onSearchChange() {
    this.filterService.setString(this.query)
  }

  getTypeOfMeal() {
    return this.dishListService.getTypesOfMeals()
  }

  getTypeOfCuisine() {
    return this.dishListService.getTypesOfCuisine()
  }

  getMeatInclusion() {
    return this.dishListService.getMeatInclusion()
  }

  getMinPrice() {
    return this.dishListService.getMinPrice();
  }

  getMaxPrice() {
    return this.dishListService.getMaxPrice();
  }

  getMinRating() {
    return this.dishListService.getMinRating();
  }

  getMaxRating() {
    return this.dishListService.getMaxRating();
  }

  onSelectTypeOfDish() {
      this.filterService.selectedTypesOfMeals = this.mealType
  }
  onSelectAllTypeOfDish(){
    this.filterService.selectedTypesOfMeals = this.getTypeOfMeal()
  }

  onDeSelectTypeOfDish() {
    if(this.mealType.length == 0){
      this.filterService.selectedTypesOfMeals = this.getTypeOfMeal()
    }
    else{
      this.filterService.selectedTypesOfMeals = this.mealType
    }
  }

  onSelectTypeOfCuisine() {
    this.filterService.selectedTypesOfCuisine = this.cuisine
  }

  onSelectAllTypeOfCuisine(){
    this.filterService.selectedTypesOfCuisine = this.getTypeOfCuisine()
  }

  onDeSelectTypeOfCuisine() {
    if(this.cuisine.length == 0){
      this.filterService.selectedTypesOfCuisine = this.getTypeOfCuisine()
    }
    else{
      this.filterService.selectedTypesOfCuisine = this.cuisine
    }
  }

  onSelectMeatInclusion() {
    console.log(this.meat)
    this.filterService.selectedMeatInclusion = this.meat
  }

  onSelectAllMeatInclusion(){
    this.filterService.selectedMeatInclusion = this.getMeatInclusion()
  }

  onDeSelectMeatInclusion() {
    if(this.meat.length == 0){
      this.filterService.selectedMeatInclusion = this.getMeatInclusion()
    }
    else{
      this.filterService.selectedMeatInclusion = this.meat
    }
  }
  onSelectMinValue() {
    this.filterService.minPrice = this.minPrice
  }

  onSelectMaxValue() {
    this.filterService.maxPrice = this.maxPrice
  }

  onSelectMinRating() {
    this.filterService.minRating = this.minRating
  }

  onSelectMaxRating() {
    this.filterService.maxRating = this.maxRating
  }

  getSliderMinValue(){
    if(this.minPrice <  this.getMinPrice()){
      this.minPrice = this.getMinPrice()
    }
    return this.minPrice
  }

}
