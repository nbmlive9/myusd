import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  
    currentTab: 'profile' | 'password' = 'profile';
  
    switchTab(tab: 'profile' | 'password') {
      this.currentTab = tab;
    }
  }

