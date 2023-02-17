import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DishListServiceService } from 'src/app/services/dish-list-service.service';
import { UserService } from 'src/app/services/user.service';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from "@angular/forms";


@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.css']
})
export class ModalWindowComponent {
  isMinusVisible: boolean
  isPlusVisible: boolean
  idOfDish: string
  dish: any;
  private routeSub: Subscription

  constructor(public dishListService: DishListServiceService, public userService: UserService, private route: ActivatedRoute) {}
  ngOnInit(){
    this.dish = {}
    this.routeSub = this.routeSub = this.route.params.subscribe(params => {
      this.idOfDish = params['id']
    });
    this.dish = this.dishListService.getDish(this.idOfDish)
    }

  onPlusClick() {
    if (this.dish.value.inStock != 0) {
      this.isMinusVisible = true
      this.userService.addToBasket(this.dish.key, this.dish.price)
      if (this.dish.value.inStock == 0)
        this.isPlusVisible = false
    }
  }

  onMinusClick() {
    let a = this.userService.removeFromBasket(this.dish.key)
      if (a == 0)
        this.isMinusVisible = false
  }
}
