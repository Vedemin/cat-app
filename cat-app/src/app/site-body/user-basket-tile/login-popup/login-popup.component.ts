import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.css']
})
export class LoginPopupComponent {
  @Input() visibility: boolean
  constructor(public userService: UserService) {

  }

  validateEmail(email){
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  register(){
    let name = (<HTMLInputElement>document.getElementById("nameInput")).value
    let pass = (<HTMLInputElement>document.getElementById("passInput")).value
    let mail = (<HTMLInputElement>document.getElementById("mailInput")).value
    if (this.validateEmail(mail)){
      let success = this.userService.register(name, pass, mail)
      alert("Successfuly registered user")
    } else {
      alert("Mail incorrect")
    }
  }
  
  login(){
    let name = (<HTMLInputElement>document.getElementById("nameInput")).value
    let pass = (<HTMLInputElement>document.getElementById("passInput")).value
    // let success: boolean
    this.userService.logIn(name, pass)

  }
}
