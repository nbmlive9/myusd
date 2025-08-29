import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  gotp: any;
form1:FormGroup;
  showOtpForm: boolean | undefined;
  constructor(private api: UserService, private fb: FormBuilder,private token:TokenService,private toast:ToastrService) {
    this.form = this.fb.group({
      name: [''],
      country: [''],
      password: [''],
      email: [''],
      wallet1:['']
    });
    this.form1=this.fb.group({
       otp: ['', Validators.required],
    })
  }


  switchTab(tab: 'profile' | 'password') {
    this.currentTab = tab;
  }

  getdata() {
    this.api.getProfiledata().subscribe((res: any) => {
      // console.log("profiledata:", res);
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
    // Step 1: Generate OTP before saving
    this.generateOtp();
  }
}

generateOtp() {
  this.api.GenerateOtp().subscribe((res: any) => {
    if (res.status === 1) {
      this.toast.success(res?.message || 'OTP sent ✅', 'Success');
      this.showOtpForm = true; // show OTP input
    } else {
      this.toast.error(res?.message || 'OTP generation failed ❌', 'Error');
    }
  });
}

verifyOtpAndSave() {
  if (this.form1.invalid) {
    this.form1.markAllAsTouched();
    return;
  }

  const payload = { otp: this.form1.value.otp };

  this.api.VerifyOtp(payload).subscribe({
    next: (res: any) => {
      if (res.status === 1) {
        this.toast.success(res?.message || 'OTP Verified ✅', 'Success');
        this.showOtpForm = false;

        // ✅ Now call actual save API
        this.callSaveApi();
         this.form1.reset();
      } else {
        this.toast.error(res?.message || 'Invalid OTP ❌', 'Error');
      }
    },
    error: (err) => {
      this.toast.error(err?.error?.message || 'OTP verification failed ❌', 'Error');
    }
  });
}

callSaveApi() {
  const payload = this.form.value;

  this.api.updateProfile(payload).subscribe({
    next: (res: any) => {
      if (res.status === 1) {
        this.toast.success(res?.message || 'Profile updated ✅', 'Success');
        this.isEdit = false;
        this.getdata();
      } else {
        this.toast.error(res?.message || 'Update failed ❌', 'Error');
      }
    },
    error: (err) => {
      this.toast.error(err?.error?.message || 'Something went wrong ❌', 'Error');
    }
  });
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
