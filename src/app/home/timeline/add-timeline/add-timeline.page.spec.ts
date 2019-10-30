import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTimelinePage } from './add-timeline.page';

describe('AddTimelinePage', () => {
  let component: AddTimelinePage;
  let fixture: ComponentFixture<AddTimelinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTimelinePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTimelinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
