import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddlangkahPage } from './addlangkah.page';

describe('AddlangkahPage', () => {
  let component: AddlangkahPage;
  let fixture: ComponentFixture<AddlangkahPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddlangkahPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddlangkahPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
