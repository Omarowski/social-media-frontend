import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  private apiUrl = 'http://localhost:8080/api/likes';

  constructor(private http: HttpClient) { }

  likePost(postId: number, userId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}`, null, {
      params: { postId: postId.toString(), userId: userId.toString() }
    });
  }

  unlikePost(postId: number, userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}`, {
      params: { postId: postId.toString(), userId: userId.toString() }
    });
  }

  getLikeCount(postId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/post/${postId}/count`);
  }

  getUserLikedStatus(postId: number, userId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/post/${postId}/liked`, {
      params: { userId: userId.toString() }
    });
  }
}