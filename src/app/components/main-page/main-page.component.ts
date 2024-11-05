import { Component, OnInit } from '@angular/core';
import { PostComponent } from './post/post.component';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { CreatePostPanelComponent } from './create-post-panel/create-post-panel.component';
import { FilterPostComponent } from './filter-post/filter-post.component';
import {UserService} from "../../services/user.service";
import {HttpClientModule} from "@angular/common/http";
import { PostsService } from '../../services/posts.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../common/user';
import { Post } from '../../common/post';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
  providers:[UserService]
})
export class MainPageComponent implements OnInit {

  currentUser: User | undefined;
  posts: Post[] = [];

  constructor(private postService: PostsService, private storageService: StorageService) {

  }
  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.loadAllSubscribedPosts()
  }


  loadAllSubscribedPosts() {
    this.postService.getAllsubscribedPosts(this.currentUser!.firstName).subscribe((data) => {
      this.posts = data;
      console.log(data)
    })
  }



}
