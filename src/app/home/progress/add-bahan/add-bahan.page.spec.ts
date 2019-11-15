import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBahanPage } from './add-bahan.page';

describe('AddBahanPage', () => {
  let component: AddBahanPage;
  let fixture: ComponentFixture<AddBahanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBahanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBahanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
