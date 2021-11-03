import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeicToAnyComponent } from './heic-to-any.component';

describe('HeicToAnyComponent', () => {
  let component: HeicToAnyComponent;
  let fixture: ComponentFixture<HeicToAnyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeicToAnyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeicToAnyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
