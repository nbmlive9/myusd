import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  isCollapsed = false;
  udata: any;
  constructor(private router:Router,private token:TokenService,private api:UserService){}
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
  ngOnInit(){
    this.api.home().subscribe((res: any) => {
      console.log('utree', res);
      this.udata = res.data.profiledata;
  });
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

  mytree(regid: string) {
    this.router.navigateByUrl(`/treeview/${regid}`);
  } 


}
