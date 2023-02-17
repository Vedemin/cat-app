import { Injectable } from '@angular/core';
import { get, getDatabase, ref, remove, update } from "firebase/database";
import { DishListServiceService } from './dish-list-service.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  loggedIn = false
  userDataBase: any
  login = ""
  userType: string
  basket = {}
  previousBaskets = []
  totalPrice = "0"
  inBasket = 0
  multiplier = 1.0
  curr = "EUR"
  // EUR -> EUR: 1.00
  // EUR -> USD: 1.06

  constructor(private dishListService: DishListServiceService) { }

  setUserDatabase(usersBase: any) {
    this.userDataBase = usersBase
    console.log(this.userDataBase)
  }

  getUserDatabase() {
    return this.userDataBase
  }

  logIn(name: string, password: string) {
    console.log(name)
    console.log(this.userDataBase)
    if (name in this.userDataBase) {
      if (password == this.userDataBase[name].password) {
        this.login = name
        this.userType = this.userDataBase[name].userType
        this.basket = this.userDataBase[name].basket
        if (this.basket == undefined)
          this.basket = {}
        this.previousBaskets = this.userDataBase[name].previousBaskets
        if (this.previousBaskets == undefined)
          this.previousBaskets = []
        this.loggedIn = true
        console.log(this.loggedIn)
        this.calculateTotalPrice()
      } else {
        alert("Wrong password")
      }
    } else {
      alert("This username does not exist!")
    }
  }

  logOut() {
    if (this.login != "") {
      this.login = ""
      this.userType = "guest"
      this.basket = {}
      this.previousBaskets = []
      this.loggedIn = false
      this.calculateTotalPrice()
    }
  }

  register(name: string, password: string, email: string) {
    if (!(name in this.userDataBase)) {
      let data = {
        banned: false,
        password: password,
        email: email,
        userType: "client",
        basket: {},
        previousBaskets: []
      }
      this.userDataBase[name] = data
      const db = getDatabase();
      const userRef = ref(db, "/users/");
      update(userRef, { [name] : data })
      this.calculateTotalPrice()
      this.logIn(name, password)
      return true
    } else {
      alert("This user already exists, please log in instead")
      return false
    }
  }

  calculateTotalPrice() {
    let total = 0
    let amount = 0
    for (let d in this.basket) {
      total += parseFloat(this.basket[d].price) * this.basket[d].amount
      amount += this.basket[d].amount
    }
    this.totalPrice = total.toString()
    this.inBasket = amount
    console.log(this.totalPrice)
  }

  addToBasket(name: string, price: number ) {
    console.log("AAA" + name + price.toString())
    if (name in this.basket) {
      this.basket[name].amount += 1
    } else {
      this.basket[name] = {
        amount: 1, price: price
      }
    }
    this.calculateTotalPrice()
    console.log(this.basket)
    this.updateBasket()
  }

  removeFromBasket(name: string) {
    if (name in this.basket) {
      if (this.basket[name].amount > 1) {
        this.basket[name].amount -= 1
        this.calculateTotalPrice()
        this.updateBasket()
        return this.basket[name].amount
      } else {
        delete this.basket[name]
        this.calculateTotalPrice()
        console.log(this.basket)
        this.updateBasket()
        return 0
      }
    } else {
      return 0
    }
  }

  buy() {
    const date = new Date().toJSON();
    this.previousBaskets.push([this.basket, date])
    const db = getDatabase();
    for (let d in this.basket) {
      let iS = this.dishListService.getDish(d).inStock
      const dishRef = ref(db, "/dishes/"+ d);
      update(dishRef, {"inStock": iS - this.basket[d].amount})
      this.dishListService.modDish(d, "inStock", iS - this.basket[d].amount)
    }

    if (this.loggedIn) {
      const userRef = ref(db, "/users/"+ this.login);
      
      update(userRef, {"basket": {}, "previousBaskets": this.previousBaskets})
    }

    this.basket = {}
    this.calculateTotalPrice()
  }

  currency(curre: string) {
    this.curr = curre
    if (curre == 'USD')
      this.multiplier = 1.06
    else
      this.multiplier = 1
  }

  updateBasket(){
    if (this.loggedIn) {
      const db = getDatabase();
      const userRef = ref(db, "/users/"+ this.login);
      update(userRef, {"basket": this.basket})
    }
  }
}
