import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MealIdeasShoppingComponent } from './meal-ideas-shopping.component';

describe('MealIdeasShoppingComponent', () => {
  let component: MealIdeasShoppingComponent;
  let fixture: ComponentFixture<MealIdeasShoppingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MealIdeasShoppingComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MealIdeasShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
