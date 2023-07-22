import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopRevisionComponent } from './shop-revision.component';

describe('ShopRevisionComponent', () => {
  let component: ShopRevisionComponent;
  let fixture: ComponentFixture<ShopRevisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopRevisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
