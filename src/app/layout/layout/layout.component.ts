import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  isCollapsed = false;
  constructor(private router:Router,private token:TokenService){}
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  activeLink: string = 'dashboard'; 

  setActive(link: string) {
    this.activeLink = link;
  }

  // logout(): void {
  //   localStorage.removeItem('token');
  //   this.router.navigate(['/login']);
  // }
  logout() {
    this.token.signOut();
  }

}
