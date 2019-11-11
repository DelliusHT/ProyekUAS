import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeetingPage } from './add-meeting.page';

describe('AddMeetingPage', () => {
  let component: AddMeetingPage;
  let fixture: ComponentFixture<AddMeetingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMeetingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMeetingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
