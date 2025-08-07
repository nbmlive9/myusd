import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
      this.updateMobileState();
  window.addEventListener('resize', this.updateMobileState.bind(this));
  }

  updateMobileState() {
  this.isMobile = window.innerWidth <= 768;
  if (!this.isMobile) {
    this.isCollapsed = true; // keep sidebar open on desktop
  }
}

handleNavigation() {
  if (this.isMobile) {
    this.toggleSidebar();
  }
}



  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
    if (!this.isMobile) {
      this.isCollapsed = true; // Show sidebar on desktop
    }
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
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
