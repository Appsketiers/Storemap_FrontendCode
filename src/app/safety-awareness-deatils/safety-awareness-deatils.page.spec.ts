import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SafetyAwarenessDeatilsPage } from './safety-awareness-deatils.page';

describe('SafetyAwarenessDeatilsPage', () => {
  let component: SafetyAwarenessDeatilsPage;
  let fixture: ComponentFixture<SafetyAwarenessDeatilsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SafetyAwarenessDeatilsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SafetyAwarenessDeatilsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
