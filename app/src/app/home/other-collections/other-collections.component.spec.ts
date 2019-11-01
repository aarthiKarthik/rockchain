import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherCollectionsComponent } from './other-collections.component';

describe('OtherCollectionsComponent', () => {
  let component: OtherCollectionsComponent;
  let fixture: ComponentFixture<OtherCollectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherCollectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
