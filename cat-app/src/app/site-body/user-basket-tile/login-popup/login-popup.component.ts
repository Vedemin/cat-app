import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.css']
})
export class LoginPopupComponent {
  constructor(public userService: UserService) {

  }

  register(){
    let name = (<HTMLInputElement>document.getElementById("nameInput")).value
    let pass = (<HTMLInputElement>document.getElementById("passInput")).value
    let success: boolean
    success = this.userService.register(name, pass)
  }
  
  login(){
    let name = (<HTMLInputElement>document.getElementById("nameInput")).value
    let pass = (<HTMLInputElement>document.getElementById("passInput")).value
    // let success: boolean
    this.userService.logIn(name, pass)

  }
}
