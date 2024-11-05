import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../common/comment';


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiUrl = 'http://localhost:8080/api/comments';

  constructor(private http: HttpClient) { }

  getComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/post/${postId}`);
  }

  addComment(postId: number, username: string, content: string): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}`, { postId, username, content });
  }

  deleteComment(commentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${commentId}`);
  }
}