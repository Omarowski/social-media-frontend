import { Component, Input, OnInit } from '@angular/core';
import { UserSidePanelComponent } from "../user-side-panel/user-side-panel.component";
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../common/user';
import { ChatService } from '../../../services/chat.service';
import { AuthService } from '../../../services/auth.service';
import { ChatMessageService } from '../../../services/chatMessage.service';
import { switchMap } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-user-main-panel',
  templateUrl: './user-main-panel.component.html',
  styleUrl: './user-main-panel.component.css'
})
export class UserMainPanelComponent implements OnInit {
@Input() username:string = "" 
currentUser: User | undefined;
loggedInUser: User | undefined;
messageContent='';
isUserSubscribed: boolean | undefined;

constructor(private router:Router,private userService: UserService, private chatService: ChatMessageService, private storageService: StorageService,  private cd: ChangeDetectorRef) {

}

ngOnInit(): void {
    // Fetch the current user first
    this.userService.fidnUserByUsername(this.username)
    .pipe(
      // Switch to the next observable only after the first one completes
      switchMap((data) => {
        // Assign the current user data
        this.currentUser = data;
        console.log(data);
        
        // Now fetch the logged in user's details
        this.loggedInUser = this.storageService.getUser();
        console.log( this.loggedInUser );
        
        
        // Return the second observable (the checkForFollowing call)
        return this.userService.checkForFollowing(this.loggedInUser!.firstName, this.currentUser.firstName);
      })
    )
    .subscribe((isSubscribed) => {
      // Handle the result of the second call
      console.log(isSubscribed);
      this.isUserSubscribed = isSubscribed;
    });
}

  gotoEdit() {
    this.router.navigate(["/user-update-infos"]);
    console.log('routing to Edit page')
  }

  gotoMessages(){
    this.router.navigate(['/messages']);
    console.log('routing to messages page')
  }

  sendMessage() {
    if (this.messageContent.trim() === '' || !this.currentUser) {
      return;
    }

    this.chatService.sendMessage(this.storageService.getUser().firstName, this.currentUser.firstName, this.messageContent)
      .subscribe(() => {
        this.messageContent = '';
      });
  }

  subscribe() {
    this.userService.followUser(this.loggedInUser!.firstName, this.currentUser!.firstName).subscribe((data) => {
      
      this.isUserSubscribed = true;
      this.cd.detectChanges();
    })
    
  }

  unsubscribe() {
    this.userService.unfollowUser(this.loggedInUser!.firstName, this.currentUser!.firstName).subscribe((data) => {
      this.isUserSubscribed = false;
      this.cd.detectChanges();
    })
    
  }

}
