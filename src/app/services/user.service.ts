import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {User} from "../common/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "http://localhost:8080/api/users"

  constructor(private httpClient: HttpClient) {}  

  public getUser(id:number):Observable<User> {
      return this.httpClient.get<User>(`${this.baseUrl}/${id}`).pipe(
        map(response => response)
      );
  }

  fidnUserByUsername(query: string): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/findUser?query=${query}`);
  }

  searchUsers(query: string): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUrl}/search?query=${query}`);
  }

  followUser(follower: string, followed: string): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/${follower}/follow/${followed}`, {},{
      params: {
        
      }
    });
  }

  unfollowUser(follower: string, followed: string): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/${follower}/unfollow/${followed}`, {}, {
      params: {
        
      }
    });
  }

  checkForFollowing(follower: string, followed: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.baseUrl}/subscription/exists?follower=${follower}&followed=${followed}`);
  }
}

// Might be useful in case of mapping of an array
//
// interface GetResponse {
//   _embedded: {
//     users:User[]
//   }
// }
