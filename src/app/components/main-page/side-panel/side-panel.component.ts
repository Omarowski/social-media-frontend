import {Component, Inject, OnInit} from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import {User} from "../../../common/user";
import {UserService} from "../../../services/user.service";
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import { AuthService } from '../../../services/auth.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.css',
  providers:[UserService]
})
export class SidePanelComponent implements OnInit{
  user: User = new User(-1,"","","", "")
  constructor(private userService: UserService, private storageService: StorageService) {}
  ngOnInit():void {
      this.getUser();
  }

  getUser() {
    this.user = this.storageService.getUser()
  }
}
