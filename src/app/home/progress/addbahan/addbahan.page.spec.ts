import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbahanPage } from './addbahan.page';

describe('AddbahanPage', () => {
  let component: AddbahanPage;
  let fixture: ComponentFixture<AddbahanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddbahanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddbahanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
