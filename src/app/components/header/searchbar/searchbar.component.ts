import { Component, OnInit } from '@angular/core';
import { User } from '../../../common/user';
import { UserService } from '../../../services/user.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Router, RouterLink } from '@angular/router';
import { Overlay } from '@angular/cdk/overlay';
import { NavbarStateService } from '../navbar/navbar-state.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent implements OnInit {
  query: string = '';
  users: User[] = [];
  showResults: boolean = false;
  overlayOpen: boolean = true;

  private searchTerms = new Subject<string>();

  constructor(private userService: UserService, private router: Router, private overlay: Overlay, private navbarState: NavbarStateService) {}

  ngOnInit(): void {
    // Listen for search term changes, debounce and make the search request
    this.searchTerms.pipe(
      debounceTime(300), // Wait for 300ms pause in typing
      distinctUntilChanged(), // Only search if the term has changed
      switchMap((term: string) => this.userService.searchUsers(term)) // Switch to new search observable
    ).subscribe((data: User[]) => {
      this.users = data;
      console.log(data)
      this.overlayOpen = this.users.length > 0;
    });
  }

  // searchUsers(): void {
  //   if (this.query.trim()) {
  //     this.userService.searchUsers(this.query).subscribe((data: User[]) => {
  //       this.users = data;
  //     });
  //   }
  // }

  onSearchInput(term: string): void {
    if (term.trim()) {  // Check if term is non-empty (ignores spaces)
      this.searchTerms.next(term);
    } else {
      this.users = []; // Clear the results if the query is empty
      this.showResults = false; // Hide the results tab
    }
  }

  viewUser(username: string) {
    this.users = [];
    this.showResults = false;
    this.router.navigate(['/user-main-page',username]);
 
    this.navbarState.setSelectedIndex(1);
    

  }

  closeOverlay(): void {
    this.overlayOpen = false; // Set overlayOpen to false to close the overlay
  }
}
