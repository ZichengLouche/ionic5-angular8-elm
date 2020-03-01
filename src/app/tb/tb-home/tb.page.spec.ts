import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TBPage } from './tb.page';

describe('TBPage', () => {
  let component: TBPage;
  let fixture: ComponentFixture<TBPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TBPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TBPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
