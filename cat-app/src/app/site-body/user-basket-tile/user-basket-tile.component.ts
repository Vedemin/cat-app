import { Component } from '@angular/core';
import {UserService} from 'src/app/services/user.service'

@Component({
  selector: 'app-user-basket-tile',
  templateUrl: './user-basket-tile.component.html',
  styleUrls: ['./user-basket-tile.component.css']
})
export class UserBasketTileComponent {
  name: string
  bCount = 0
  price = 0
  loginVisible = false
 constructor(public userService: UserService) {
  this.price = parseFloat(userService.totalPrice)
 }

 showLogin() {
  this.loginVisible = !this.loginVisible
 }

 logOut() {
  this.userService.logOut()
 }

}
