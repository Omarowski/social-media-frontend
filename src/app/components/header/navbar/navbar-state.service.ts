import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarStateService {
  selectedIndex: number = 0;

  selectedTab = {
    0: "Home",
    1: "User",
    2: "Friends",
    3: "Chat",
    4: "Settings"
  }
  
  constructor() { }

  setSelectedIndex(index: number) {
    this.selectedIndex = index
  }

  getSelectedIndex():number {
    return this.selectedIndex
  }

  getSelectedTabFromIndex(): string {
    return this.selectedTab[this.selectedIndex as keyof typeof this.selectedTab];
  }
}
