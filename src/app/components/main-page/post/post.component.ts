import { Component, Input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostCommentPanelComponent } from './post-comment-panel/post-comment-panel.component';
import { Post } from '../../../common/post';
import { LikeService } from '../../../services/likes.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../common/user';
import { StorageService } from '../../../services/storage.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {
    @Input() imageUrl!: string;
    @Input() accountUrl!: string;
    @Input() post!: Post;
    currentUser: User | undefined;
    isLikedByCurrentUser: boolean = false;
    likeCount: number = 0;

constructor(private likeService: LikeService, private storageService: StorageService) {
  this.currentUser = storageService.getUser();
}

ngOnInit(): void {
  this.likeService.getUserLikedStatus(this.post.postId, this.currentUser!.id).subscribe((data) => {
    // console.log(data);
    this.isLikedByCurrentUser = data;
  })
  this.likeService.getLikeCount(this.post.postId).subscribe((data) => {
  
    this.likeCount = data
  })
}

likePost() {
  this.likeService.likePost(this.post.postId, this.currentUser!.id).subscribe(() => {
    this.isLikedByCurrentUser = true;
    this.likeCount++
  });
}

unlikePost() {
  this.likeService.unlikePost(this.post.postId, this.currentUser!.id).subscribe(() => {
    this.isLikedByCurrentUser = false;
    this.likeCount--
  });
}
};