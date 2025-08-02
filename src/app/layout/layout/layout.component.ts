import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  isCollapsed = false;
  constructor(private router:Router){}
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }


  
  activeLink: string = 'dashboard'; 

  setActive(link: string) {
    this.activeLink = link;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
