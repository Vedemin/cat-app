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
  starRating = 0
  review_form: any;
  dish: any;
  reviews: [{date:string,topic:string,nick:string,review:string}] = [{date:null, nick:null,topic:null,review:null}]
  private routeSub: Subscription

  constructor(public dishListService: DishListServiceService, public userService: UserService, private route: ActivatedRoute) {}
  ngOnInit(){
    this.dish = {}
    this.routeSub = this.routeSub = this.route.params.subscribe(params => {
      this.idOfDish = params['id']
    });
    this.dish = this.dishListService.getDish(this.idOfDish)
    this.review_form = new FormGroup({
      nick: new FormControl( Validators.compose([Validators.required, Validators.minLength(3)])),
      topic: new FormControl( Validators.compose([Validators.required, Validators.minLength(3)])),
      date: new FormControl(),
      review: new FormControl(Validators.compose([Validators.required, Validators.minLength(30),Validators.maxLength(500)])),
    })
    }

  onPlusClick() {
    if (this.dish.value.inStock != 0) {
      this.isMinusVisible = true
      console.log({key:this.dish.key, character: "+"})
      // this.orderUpdate.emit({key:this.key, name: this.name, character: "+"})
      this.userService.addToBasket(this.dish.key, this.dish.price)
      // this.basketService.
      if (this.dish.value.inStock == 0)
        this.isPlusVisible = false
    }
  }

  onMinusClick() {
    let a = this.userService.removeFromBasket(this.dish.key)
      if (a == 0)
        this.isMinusVisible = false
  }

  onSubmit() {
    if (this.review_form.valid) {
      console.log(this.reviews)
      this.reviews.push({date:this.review_form.get('date').value, topic: this.review_form.get('topic').value,nick:this.review_form.get('nick').value,review:this.review_form.get('review').value})
    } else {
      console.log("skowkowkso")
      this.validateAllFormFields(this.review_form);
    }
  }

  isPlusButtonVisible(){
      return this.dishListService.getDish(this.idOfDish).quantity > 0;
  }

  isMinusButtonVisible(){
    return this.dishListService.getDish(this.idOfDish).ordered > 0;
  }
  private validateAllFormFields(review_form: any) {

  }
}
