import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TokenService } from '../service/token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  dashboarddata: any;
  homedata: any;
  pffdata: any;
  form: FormGroup;
  currentTab: 'profile' | 'password' = 'profile';
  isEdit: boolean = false;
  CountryCode: any;
  numbercode: any;
  codes: any;
  countries:any;

  constructor(private api: UserService, private fb: FormBuilder,private token:TokenService,private toast:ToastrService) {
    this.form = this.fb.group({
      name: [''],
      country: [''],
      password: [''],
      email: [''],
      wallet1:['']
    });
  }


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
      name: this.pffdata.name,
      country: this.pffdata.country,
      email: this.pffdata.email,
      password: this.pffdata.password,
      wallet1:this.pffdata.wallet1
    });
  }

  save() {
    if (this.form.valid) {
      const payload = this.form.value;
  
      this.api.updateProfile(payload).subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.status === 1) {
            this.toast.success(res?.message || 'Update successful ✅', 'Success');
            this.isEdit = false;
            this.getdata();
          } else {
            this.toast.error(res?.message || 'Update failed. Please try again.', 'Error');
          }
        },
        error: (err) => {
          this.toast.error(err?.error?.message || 'Something went wrong. Please try again.', 'Error');
        }
      });
    }
  }
  

  logout() {
    this.token.signOut();
  }


  ngOnInit(): void {
    this.getdata();
    this.getCountries();
  }
  getCountries() {
    this.api.getCountries().subscribe({
      next: (res: any) => {
        this.codes = res.map((c: any) => c.cca2).filter(Boolean);
        this.countries = res
          .map((c: any) => c.name?.common)
          .filter(Boolean)
          .sort();
  
        console.log("Country Names:", this.countries);
        console.log("Country Codes:", this.codes);
      },
      error: (err) => {
        console.error('API Error:', err);
      }
    });
  }
  

  

}
