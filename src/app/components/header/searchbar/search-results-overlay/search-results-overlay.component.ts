import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../../common/user';


@Component({
  selector: 'app-search-results-overlay',
  template: `
  <div class="overlay-container">
  <div class="tab-header">
      <h3>Search Results ({{ users.length }})</h3>
    </div>
  
    <div class="overlay-content">
      <ul>
        <li *ngFor="let user of users" (click)="selectUser(user.firstName)">
          <strong>{{ user.firstName }}</strong> - {{ user.firstName }} {{ user.lastName }}
        </li>
      </ul>
      <div *ngIf="users.length === 0">
        <p>No users found for "{{ searchQuery }}"</p>
      </div>
    </div>
  </div>
  `,
  styles: [
    `
      .overlay-container {
        width:500px;
        background: white;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        max-height: 200px;
        overflow-y: auto;
        padding: 10px;
      }


      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      li {
        padding: 10px;
        cursor: pointer;
      }

      li:hover {
        background-color: #f0f0f0;
      }

      p {
        margin: 0;
        padding: 10px 0;
      }
    `
  ]
})
export class SearchResultsOverlayComponent {
  @Input() users: User[] = [];
  @Input() searchQuery: string = '';
  @Output() childClick = new EventEmitter<string>();

  selectUser(username: string) {
    this.childClick.emit(username);
    this.users =[]
  }
}