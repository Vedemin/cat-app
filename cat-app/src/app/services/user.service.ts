import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  loggedIn = false
  userDataBase: any
  login = ""
  isAdmin: boolean
  basket = {}
  previousBaskets: any
  totalPrice = "0"
  inBasket = 0

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
      this.login = name
      this.isAdmin = this.userDataBase[name].isAdmin
      this.basket = this.userDataBase[name].basket
      this.previousBaskets = this.userDataBase[name].previousBaskets
      this.loggedIn = true
      console.log(this.loggedIn)
    } else {
      alert("This username does not exist!")
    }
  }

  logOut() {
    if (this.login != "") {
      this.login = ""
      this.isAdmin = false
      this.basket = {}
      this.previousBaskets = []
      this.loggedIn = false
    }
  }

  register(name: string, password: string) {
    if (!(name in this.userDataBase)) {
      this.userDataBase[name] = {
        password: password,
        isAdmin: false,
        basket: {},
        previousBaskets: []
      }
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
  }

  removeFromBasket(name: string) {
    if (name in this.basket) {
      if (this.basket[name].amount > 1) {
        this.basket[name].amount -= 1
        this.calculateTotalPrice()
        return this.basket[name].amount
      } else {
        delete this.basket[name]
        this.calculateTotalPrice()
        console.log(this.basket)
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
}
