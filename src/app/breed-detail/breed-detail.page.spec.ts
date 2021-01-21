import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BreedDetailPage } from './breed-detail.page';

describe('BreedDetailPage', () => {
  let component: BreedDetailPage;
  let fixture: ComponentFixture<BreedDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreedDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BreedDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
