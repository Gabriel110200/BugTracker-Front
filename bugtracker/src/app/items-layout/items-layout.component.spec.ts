import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsLayoutComponent } from './items-layout.component';

describe('ItemsLayoutComponent', () => {
  let component: ItemsLayoutComponent;
  let fixture: ComponentFixture<ItemsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
