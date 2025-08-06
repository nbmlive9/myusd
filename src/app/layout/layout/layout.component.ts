import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { TokenService } from 'src/app/service/token.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isCollapsed = false;
  isMobile = false;
  udata: any;
  activeLink: string = '';

  constructor(private router: Router, private token: TokenService, private api: UserService) {}

  ngOnInit() {
    this.api.home().subscribe((res: any) => {
      this.udata = res.data.profiledata;
    });

    this.checkScreenSize();
      this.handleRouteChanges();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
    
  }

checkScreenSize() {
  this.isMobile = window.innerWidth <= 768;

  // ✅ Open sidebar by default in mobile
  if (this.isMobile) {
    this.isCollapsed = true; // open
  } else {
    this.isCollapsed = true; // also open in desktop
  }
}

  handleRouteChanges() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.isMobile) {
          this.isCollapsed = false; // Close after navigating
        }
      });
  }

  toggleSidebar() {
     if (this.isMobile) {
    this.isCollapsed = !this.isCollapsed;
    }
  }

  setActive(link: string) {
    this.activeLink = link;
  }

  logout() {
    this.token.signOut();
  }

  mytree(regid: string) {
    this.router.navigateByUrl(`/treeview/${regid}`);
  }
}
