import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminfilmdetailsComponent } from './adminfilmdetails.component';

describe('AdminfilmdetailsComponent', () => {
  let component: AdminfilmdetailsComponent;
  let fixture: ComponentFixture<AdminfilmdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminfilmdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminfilmdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
