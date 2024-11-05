import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostPanelComponent } from './create-post-panel.component';

describe('CreatePostPanelComponent', () => {
  let component: CreatePostPanelComponent;
  let fixture: ComponentFixture<CreatePostPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePostPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatePostPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
