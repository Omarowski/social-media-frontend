import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../common/user';

@Component({
  selector: 'app-messages-history-panel',
  templateUrl: './messages-history-panel.component.html',
  styleUrl: './messages-history-panel.component.css'
})
export class MessagesHistoryPanelComponent {
  @Input() users: any[] | undefined
  @Input() highlightedUser: number = -1;

  @Output() childClick = new EventEmitter<string>();

  isSelected: number = 1;

  selectUser(username: string, id: number) {
    this.childClick.emit(username);
    this.isSelected = id;

  }

}
