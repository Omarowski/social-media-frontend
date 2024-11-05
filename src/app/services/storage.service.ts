import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  clean(): void {
    window.sessionStorage.clear();
    window.localStorage.clear();
  }

  public saveUser(user: any): void {
    if (isPlatformBrowser(this.platformId)) {
      // Only access window if running in the browser
      window.sessionStorage.removeItem(USER_KEY);
      window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }

  public getUser(): any {
    if (isPlatformBrowser(this.platformId)) {
      const user = window.sessionStorage.getItem(USER_KEY);
      if (user) {
        return JSON.parse(user);
      }
    }
    return null;
  }

  public isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const user = window.sessionStorage.getItem(USER_KEY);
      return !!user;
    }
    return false;
  }
}



// import { Injectable } from '@angular/core';

// const USER_KEY = 'auth-user'

// @Injectable({
//   providedIn: 'root'
// })
// export class StorageService {

//   constructor() { }

//   public saveUser(user:any): void{
//     window.sessionStorage.removeItem(USER_KEY);
//     window.sessionStorage.setItem(USER_KEY,JSON.stringify(user));
//   }

//   public getUser(): any{
//     const user = window.sessionStorage.getItem(USER_KEY);
//     if(user){
//       return JSON.parse(user)
//     }
//     return null;
//   }

//   public isLoggedIn():boolean{

//     const user = window.sessionStorage.getItem(USER_KEY);

//     if(user){
//       return true;
//     }

//     return false;

//   }


// }

