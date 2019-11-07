import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaillinePage } from './detailline.page';

describe('DetaillinePage', () => {
  let component: DetaillinePage;
  let fixture: ComponentFixture<DetaillinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetaillinePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaillinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
