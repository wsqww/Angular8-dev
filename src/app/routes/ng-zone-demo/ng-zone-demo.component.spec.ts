import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgZoneDemoComponent } from './ng-zone-demo.component';

describe('NgZoneDemoComponent', () => {
  let component: NgZoneDemoComponent;
  let fixture: ComponentFixture<NgZoneDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgZoneDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgZoneDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
