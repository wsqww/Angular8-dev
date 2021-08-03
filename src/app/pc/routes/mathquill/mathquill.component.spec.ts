import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MathquillComponent } from './mathquill.component';

describe('MathquillComponent', () => {
  let component: MathquillComponent;
  let fixture: ComponentFixture<MathquillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MathquillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MathquillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
