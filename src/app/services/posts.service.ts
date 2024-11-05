import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "../common/post";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
  })
  export class PostsService { 
    private baseUrl = "http://localhost:8080/api/posts"

    constructor(private httpClient: HttpClient) {

    }

    public getAllsubscribedPosts(username: string):Observable<Post[]> {
        return this.httpClient.get<Post[]>(`${this.baseUrl}/userSubscribedPosts?query=${username}`);
    }

    createPost(formData: FormData): Observable<any> {
        return this.httpClient.post<any>(`${this.baseUrl}/create`, formData);
      }
  }
