import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
<<<<<<< HEAD
import { FormBuilder, FormGroup } from '@angular/forms';
import { TokenService } from '../service/token.service';
=======
>>>>>>> balu

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  dashboarddata: any;
<<<<<<< HEAD
  homedata: any;
  pffdata: any;
  form: FormGroup;
  currentTab: 'profile' | 'password' = 'profile';
  isEdit: boolean = false;

  constructor(private api: UserService, private fb: FormBuilder,private token:TokenService) {
    this.form = this.fb.group({
      name: [''],
      country: [''],
      password: [''],
      email: [''],
      regid: ['']
    });
  }
=======
  homedata:any;
  pffdata: any;
  currentTab: 'profile' | 'password' = 'profile';

  constructor(private api:UserService){}

>>>>>>> balu

  ngOnInit() {
    this.getdata();
  }
<<<<<<< HEAD

  switchTab(tab: 'profile' | 'password') {
    this.currentTab = tab;
  }

  getdata() {
    this.api.getProfiledata().subscribe((res: any) => {
      console.log("profiledata:", res);
      this.pffdata = res.data[0];
      console.log("pffdata:", this.pffdata);
    });
  }

  edit() {
    this.isEdit = true;

    // Patch the form with existing profile data
    this.form.patchValue({
      regid: this.pffdata.regid,
      name: this.pffdata.name,
      country: this.pffdata.country,
      email: this.pffdata.email,
      password: this.pffdata.password
    });
  }

  save() {
    if (this.form.valid) {
      const payload = this.form.value;
      this.api.updateProfile(payload).subscribe((res: any) => {
        console.log(res);
        if (res.status === 1) {
          alert("Profile Updated Successfully");
          this.isEdit = false;
          this.getdata(); 
        }
      });
=======
  
  
    switchTab(tab: 'profile' | 'password') {
      this.currentTab = tab;
>>>>>>> balu
    }
    

    getdata(){
      this.api.getProfiledata().subscribe((res:any)=>{
          console.log("profiledata:",res);
          this.pffdata=res.data[0];
          console.log("pffdata:",this.pffdata);
      })
    }

    save(){
    }
    edit(){
    }
   

  }

  logout() {
    this.token.signOut();
  }
}
