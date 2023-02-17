import { Component, Input, OnInit } from '@angular/core';
import { getDatabase, onValue, ref } from "firebase/database";
import { DishListServiceService } from '../services/dish-list-service.service';
import { initializeApp } from 'firebase/app';
import { UserService } from '../services/user.service';

const firebaseConfig = {
  apiKey: "AIzaSyBirkCcyWBL3yZxXLG7Qbk5PDPt7ziwSBA",

  authDomain: "cat-app-a7ea7.firebaseapp.com",

  databaseURL: "https://cat-app-a7ea7-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "cat-app-a7ea7",

  storageBucket: "cat-app-a7ea7.appspot.com",

  messagingSenderId: "899672341023",

  appId: "1:899672341023:web:834500e129b29b8380732a"

};


@Component({
  selector: 'app-site-body',
  templateUrl: './site-body.component.html',
  styleUrls: ['./site-body.component.css']
})
export class SiteBodyComponent implements OnInit {
  app: any
  constructor(private dishList: DishListServiceService, public userService: UserService) {
  }
  ngOnInit() {
    this.app = initializeApp(firebaseConfig)
    var dishList;
    const database = getDatabase(this.app);
    const dishes = ref(database, 'dishes')

    onValue(dishes, (snapshot) => {
      dishList = snapshot.val();
      this.dishList.setDishes({...dishList, ...this.dishList.getDishes()})
    })
    var userList;
    const userRef = ref(database, 'users')
    onValue(userRef, (snapshot) => {
      userList = snapshot.val();
      this.userService.setUserDatabase({...userList, ...this.userService.getUserDatabase()})
    })
  }
}
