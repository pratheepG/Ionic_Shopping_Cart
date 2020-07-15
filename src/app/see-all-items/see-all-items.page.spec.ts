import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SeeAllItemsPage } from './see-all-items.page';

describe('SeeAllItemsPage', () => {
  let component: SeeAllItemsPage;
  let fixture: ComponentFixture<SeeAllItemsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeAllItemsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SeeAllItemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
