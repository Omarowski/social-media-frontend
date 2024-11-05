import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../common/user';
import { CommentService } from '../../../../services/comments.service';
import { MainPageComponent } from '../../main-page.component';
import { StorageService } from '../../../../services/storage.service';

@Component({
  selector: 'app-post-comment-panel',
  templateUrl: './post-comment-panel.component.html',
  styleUrl: './post-comment-panel.component.css'
})
export class PostCommentPanelComponent implements OnInit {

  currentUser: User | undefined;
  content: string = ""
  @Input() postId: number | undefined;
  @Output() posted = new EventEmitter<boolean>()

  constructor(private storageService: StorageService, private commentService: CommentService,private ref: ChangeDetectorRef, @Inject(MainPageComponent) private mainComp: MainPageComponent) {}

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser(); 
  }

  postComment():void {
    this.commentService.addComment(this.postId!, this.currentUser?.firstName!, this.content).subscribe( (message) => {
      this.content = ""
      this.ref.detectChanges();
      this.posted.emit(true)
      this.mainComp.loadAllSubscribedPosts()
      
    })
  }
}
