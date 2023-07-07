import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DressesPage } from './dresses.page';

describe('DressesPage', () => {
  let component: DressesPage;
  let fixture: ComponentFixture<DressesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DressesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
