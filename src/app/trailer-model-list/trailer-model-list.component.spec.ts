import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailerModelListComponent } from './trailer-model-list.component';

describe('TrailerModelListComponent', () => {
  let component: TrailerModelListComponent;
  let fixture: ComponentFixture<TrailerModelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrailerModelListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrailerModelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
