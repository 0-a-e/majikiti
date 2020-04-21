import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FavmsgPage } from './favmsg.page';

describe('FavmsgPage', () => {
  let component: FavmsgPage;
  let fixture: ComponentFixture<FavmsgPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavmsgPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FavmsgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
