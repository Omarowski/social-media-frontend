import { Component, OnInit } from '@angular/core';
import { UserSidePanelComponent } from './user-side-panel/user-side-panel.component';
import { UserMainPanelComponent } from "./user-main-panel/user-main-panel.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-main-page',
  templateUrl: './user-main-page.component.html',
  styleUrl: './user-main-page.component.css'
})
export class UserMainPageComponent implements OnInit {
  username: string = "";

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Access the "username" parameter from the route
    this.route.paramMap.subscribe(params => {
      this.username = params.get('username')!; // Get the value of the username
    });
  }
}
