import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlCrudComponent } from './control-crud.component';

describe('ControlCrudComponent', () => {
  let component: ControlCrudComponent;
  let fixture: ComponentFixture<ControlCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
