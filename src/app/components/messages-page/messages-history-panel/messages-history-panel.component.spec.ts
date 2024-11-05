import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesHistoryPanelComponent } from './messages-history-panel.component';

describe('MessagesHistoryPanelComponent', () => {
  let component: MessagesHistoryPanelComponent;
  let fixture: ComponentFixture<MessagesHistoryPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagesHistoryPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessagesHistoryPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
