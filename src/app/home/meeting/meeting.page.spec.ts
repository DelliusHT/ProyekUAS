import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingPage } from './meeting.page';

describe('MeetingPage', () => {
  let component: MeetingPage;
  let fixture: ComponentFixture<MeetingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
