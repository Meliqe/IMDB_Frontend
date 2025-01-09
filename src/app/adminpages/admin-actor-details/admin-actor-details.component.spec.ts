import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActorDetailsComponent } from './admin-actor-details.component';

describe('AdminActorDetailsComponent', () => {
  let component: AdminActorDetailsComponent;
  let fixture: ComponentFixture<AdminActorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminActorDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminActorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
