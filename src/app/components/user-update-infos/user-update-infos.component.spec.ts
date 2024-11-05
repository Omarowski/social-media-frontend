import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdateInfosComponent } from './user-update-infos.component';

describe('UserUpdateInfosComponent', () => {
  let component: UserUpdateInfosComponent;
  let fixture: ComponentFixture<UserUpdateInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserUpdateInfosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserUpdateInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
