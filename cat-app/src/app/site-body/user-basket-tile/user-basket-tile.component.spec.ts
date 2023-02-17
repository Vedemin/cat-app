import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBasketTileComponent } from './user-basket-tile.component';

describe('UserBasketTileComponent', () => {
  let component: UserBasketTileComponent;
  let fixture: ComponentFixture<UserBasketTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBasketTileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserBasketTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
