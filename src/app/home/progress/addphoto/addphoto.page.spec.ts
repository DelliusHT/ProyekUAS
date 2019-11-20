import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddphotoPage } from './addphoto.page';

describe('AddphotoPage', () => {
  let component: AddphotoPage;
  let fixture: ComponentFixture<AddphotoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddphotoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddphotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
