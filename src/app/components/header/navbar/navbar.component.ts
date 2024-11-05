import { Component, OnInit } from "@angular/core";
import { routes } from "../../../app-routing.module";
import { StorageService } from "../../../services/storage.service";
import { NavbarStateService } from "./navbar-state.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  route = routes;
  username: string = "";
  headerAnchors: any[] = [];

  constructor(public navbarState: NavbarStateService, private storageService: StorageService) {}

  onSelect(index: number) {
    this.navbarState.setSelectedIndex(index);
  }

  get selectedIndex(): number {
    return this.navbarState.getSelectedIndex();
  }

  get selectedTabHeader() {
    return this.navbarState.getSelectedTabFromIndex();
  }

  get getUsername () {
    return this.storageService.getUser().firstName;
  }

  ngOnInit() {
    console.log(this.selectedIndex + "")
    this.username = this.getUsername;
    console.log(this.username);

    // Now initialize headerAnchors with the correct value of this.username
    this.headerAnchors = [
      {icon:"fa-solid fa-house", route: routes[1].path},
      {icon:"fa-solid fa-user", route: `/user-main-page/${this.username}`},  // Dynamic username in the path
      {icon:"fa-solid fa-users", route: ""},
      {icon:"fa-solid fa-message", route: routes[4].path},
      {icon:"fa-solid fa-comments", route: routes[5].path},
      {icon:"fa-solid fa-gear", route: ""},
    ];
  }
}
