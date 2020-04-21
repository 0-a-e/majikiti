import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TopPage } from './top.page';

describe('TopPage', () => {
  let component: TopPage;
  let fixture: ComponentFixture<TopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
