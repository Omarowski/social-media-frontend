import { Component } from '@angular/core';
import { PostsService } from '../../../services/posts.service';
import { AuthService } from '../../../services/auth.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-create-post-panel',
  templateUrl: './create-post-panel.component.html',
  styleUrl: './create-post-panel.component.css'
})
export class CreatePostPanelComponent {
  postContent: string = '';
  selectedImage: File | null = null;
  selectedVideo: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  videoPreview: string | ArrayBuffer | null = null;

  constructor(private postService: PostsService, private storageService: StorageService) { }

  onFileSelect(event: any, fileType: string): void {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();

    // Read the selected file and set the appropriate preview
    reader.onload = () => {
      if (fileType === 'image') {
        this.imagePreview = reader.result;
        this.selectedImage = file;
      } else if (fileType === 'video') {
        this.videoPreview = reader.result;
        this.selectedVideo = file;
      }
    };

    // Read the file as a data URL
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('content', this.postContent);

    const currentUser = this.storageService.getUser();
    formData.append("username", currentUser.firstName )

    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    if (this.selectedVideo) {
      formData.append('video', this.selectedVideo);
    }

   

    this.postService.createPost(formData).subscribe(response => {
      console.log('Post created successfully', response);
    });
  }

  triggerImageInput() {
    const imageInput = document.getElementById('imageInput') as HTMLElement;
    imageInput.click();
  }

  triggerVideoInput() {
    const imageInput = document.getElementById('videoInput') as HTMLElement;
    imageInput.click();
  }
}
