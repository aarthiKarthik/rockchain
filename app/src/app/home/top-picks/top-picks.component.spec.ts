import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPicksComponent } from './top-picks.component';

describe('TopPicksComponent', () => {
  let component: TopPicksComponent;
  let fixture: ComponentFixture<TopPicksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopPicksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopPicksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
