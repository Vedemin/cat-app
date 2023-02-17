import { Component, Input, OnInit } from '@angular/core';
import { getDatabase, onValue, ref } from "firebase/database";
import { DishListServiceService } from '../services/dish-list-service.service';
import { initializeApp } from 'firebase/app';

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
  selector: 'app-main-site',
  templateUrl: './main-site.component.html',
  styleUrls: ['./main-site.component.css']
})
export class MainSiteComponent implements OnInit {
  app: any
  constructor(private dishList: DishListServiceService ) {
  }
  ngOnInit() {
    this.app = initializeApp(firebaseConfig)
    var dishList;
    const database = getDatabase(this.app);
    const dishes = ref(database,'dishes')

    onValue(dishes, (snapshot) => {
      dishList = snapshot.val();
      console.log(dishList)
      this.dishList.setDishes({...dishList, ...this.dishList.getDishes()})
    })
  }
}
