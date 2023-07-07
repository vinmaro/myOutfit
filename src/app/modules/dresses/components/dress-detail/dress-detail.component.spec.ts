import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DressDetailComponent } from './dress-detail.component';

describe('DressDetailComponent', () => {
  let component: DressDetailComponent;
  let fixture: ComponentFixture<DressDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DressDetailComponent]
    });
    fixture = TestBed.createComponent(DressDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
