import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioFormComponent } from './scenario-form.component';

describe('ScenarioFormComponent', () => {
  let component: ScenarioFormComponent;
  let fixture: ComponentFixture<ScenarioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScenarioFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScenarioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
