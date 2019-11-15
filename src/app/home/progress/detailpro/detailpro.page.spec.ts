import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailproPage } from './detailpro.page';

describe('DetailproPage', () => {
  let component: DetailproPage;
  let fixture: ComponentFixture<DetailproPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailproPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailproPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
