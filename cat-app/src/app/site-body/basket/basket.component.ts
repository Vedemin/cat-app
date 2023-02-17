import { Component, AfterContentInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

interface PreviousInterface{
  data:number;
  name:number;
  price: number;
  currency:string;
  quantity:number
}

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements AfterContentInit {
  public previouslyBoughtItems : {[key:number] : PreviousInterface}
    public busketItems: any
    constructor(public userService: UserService) {}

  ngAfterContentInit() {
    for (let d in this.userService.basket) {
      document.getElementById("header").innerHTML += d + " x" + this.userService.basket[d].amount + "\t" + this.userService.basket[d].price * this.userService.basket[d].amount + "<br>"
    }
  }

  buyItems() {}
}
