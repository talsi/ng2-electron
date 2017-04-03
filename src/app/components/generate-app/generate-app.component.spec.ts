import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateAppComponent } from './generate-app.component';

describe('GenerateAppComponent', () => {
  let component: GenerateAppComponent;
  let fixture: ComponentFixture<GenerateAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
