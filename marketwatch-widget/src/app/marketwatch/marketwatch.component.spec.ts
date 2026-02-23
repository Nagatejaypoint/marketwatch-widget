import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketwatchComponent } from './marketwatch.component';

describe('MarketwatchComponent', () => {
  let component: MarketwatchComponent;
  let fixture: ComponentFixture<MarketwatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketwatchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketwatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
