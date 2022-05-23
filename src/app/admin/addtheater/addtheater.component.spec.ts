import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtheaterComponent } from './addtheater.component';

describe('AddtheaterComponent', () => {
  let component: AddtheaterComponent;
  let fixture: ComponentFixture<AddtheaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddtheaterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtheaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
