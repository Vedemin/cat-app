import { Injectable } from '@angular/core';
import { getDatabase, ref, remove, update } from "firebase/database";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  loggedIn = false
  userDataBase: any
  login = ""
  userType: string
  basket = {}
  previousBaskets: any
  totalPrice = "0"
  inBasket = 0
  multiplier = 1.0
  curr = "EUR"
  // EUR -> EUR: 1.00
  // EUR -> USD: 1.06

  constructor() { }

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

  register(name: string, password: string) {
    if (!(name in this.userDataBase)) {
      this.userDataBase[name] = {
        password: password,
        userType: "client",
        basket: {},
        previousBaskets: []
      }
      this.calculateTotalPrice()
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
    let order = []
    for (let d in this.basket) {
      order.push([d, this.basket[d].amount, this.basket[d].price])
    }
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
      console.log(db)
      const tasksRef = ref(db, "/users/"+ this.login);
      console.log(tasksRef)
      update(tasksRef, {"basket": this.basket})
    }
  }
}
