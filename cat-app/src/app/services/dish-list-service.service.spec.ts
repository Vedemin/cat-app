import { TestBed } from '@angular/core/testing';

import { DishListServiceService } from './dish-list-service.service';

describe('DishListServiceService', () => {
  let service: DishListServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DishListServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
