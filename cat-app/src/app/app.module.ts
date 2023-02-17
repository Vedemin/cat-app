import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainSiteComponent } from './main-site/main-site.component';
import { SiteBodyComponent } from './site-body/site-body.component';
import { OfferComponent } from './site-body/offer/offer.component';
import { DishesComponent } from './site-body/offer/dishes/dishes.component';
import { DishCardComponent } from './site-body/offer/dishes/dish-card/dish-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterComponent } from './site-body/offer/filter/filter.component';
import { Routes, RouterModule } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { NgxPaginationModule } from 'ngx-pagination'
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrencyExchangePipe } from './pipes/currency-exchange.pipe';
import { IsMeatIncludedPipe } from './pipes/is-meat-included.pipe';
import { PriceFilterPipe } from './pipes/price-filter.pipe';
import { RatingFilterPipe } from './pipes/rating-filter.pipe';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { CuisineFilterPipe } from './pipes/cuisine-filter.pipe';
import { MealTypeFilterPipe } from './pipes/meal-type-filter.pipe';
import { HomeComponent } from './site-body/home/home.component';
import { BasketComponent } from './site-body/basket/basket.component';
import { UserBasketTileComponent } from './site-body/user-basket-tile/user-basket-tile.component';
import { LoginPopupComponent } from './site-body/user-basket-tile/login-popup/login-popup.component';
import { ModalWindowComponent } from './site-body/offer/dishes/modal-window/modal-window.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StarRatingComponent } from './site-body/offer/dishes/modal-window/star-rating/star-rating.component'

const appRoute : Routes = [
  {path: 'Basket', component: BasketComponent},
  {path: 'Menu', component: OfferComponent},
  {path: '', component: HomeComponent},
  {path: 'Dish/:id', component: ModalWindowComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    MainSiteComponent,
    SiteBodyComponent,
    OfferComponent,
    DishesComponent,
    DishCardComponent,
    FilterComponent,
    CurrencyExchangePipe,
    IsMeatIncludedPipe,
    PriceFilterPipe,
    RatingFilterPipe,
    SearchFilterPipe,
    CuisineFilterPipe,
    MealTypeFilterPipe,
    HomeComponent,
    BasketComponent,
    UserBasketTileComponent,
    LoginPopupComponent,
    ModalWindowComponent,
    StarRatingComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    BrowserModule,
    MatSliderModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    RouterModule.forRoot(appRoute),
    AngularFireModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
