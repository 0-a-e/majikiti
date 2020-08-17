import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TagPage } from './tag.page';

describe('TagPage', () => {
  let component: TagPage;
  let fixture: ComponentFixture<TagPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TagPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
