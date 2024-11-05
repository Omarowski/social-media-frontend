import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMainPanelComponent } from './user-main-panel.component';

describe('UserMainPanelComponent', () => {
  let component: UserMainPanelComponent;
  let fixture: ComponentFixture<UserMainPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMainPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserMainPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
