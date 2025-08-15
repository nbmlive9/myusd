import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectorRef } from '@angular/core';
  import * as bootstrap from 'bootstrap';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  selectedPosition: string = '';
  registerForm: FormGroup;
  form1!: FormGroup;
  numbercode:any;
  countries: string[] = [];
  codes: any[] = [];
  CountryCode: string = '';
  pffdata: any;
  errorMessage: any;
  idData: any;
 errorMessage1: any;
    idData1: any;
  udata: any;
  constructor(private fb: FormBuilder,private router:Router, private api: UserService,private toast:ToastrService,private cdRef: ChangeDetectorRef
    ) {
   

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
      password: ['', Validators.required],
      sponcerid: ['', Validators.required],
      position: ['Left', Validators.required], // Set default value to 'Left'
      placementid: ['', Validators.required],
      terms:['', Validators.required],
    });

  }

  ngOnInit(): void {
    this.getCountries();
    this.getProfileData();

    this.registerForm.get('country')?.valueChanges.subscribe((selectedCountry: string) => {
      const selected = this.codes.find(
        (country: any) => country.name?.common === selectedCountry
      );
    
      if (selected) {
        const cca2 = selected.cca2;
        this.CountryCode = cca2;
        console.log("Selected Country:", selected.name.common);
        console.log("Selected Country Code (cca2):", cca2);
    
        // 🔔 Call the API to get the calling code
        this.api.getCallingCode(cca2).subscribe({
          next: (res: any) => {
            console.log("📞 Calling Code Response:", res.data);
            this.numbercode=res.data.callingcodes[0]
            console.log("numbercode:",this.numbercode);
            
          },
          error: (err) => {
            console.error("❌ Error fetching calling code:", err);
          }
        });
      }
    });
    
  }

  getCountries() {
    this.api.getCountries().subscribe({
      next: (res: any) => {
        this.codes = res;
        console.log("dddddd:",res);
        

        this.countries = res
          .map((country: any) => country.name?.common)
          .filter(Boolean)
          .sort();

        const countryCodes = res.map((c: any) => c.cca2).filter(Boolean);
        console.log("Country List:", this.countries);
        console.log("Country Codes (cca2):", countryCodes);
      },
      error: (err) => {
        console.error('API Error:', err);
      }
    });
  }
// jububub

  sign(): void {
    if (!this.registerForm.valid) {
      this.toast.warning('Please fill all fields correctly.', 'Validation Error');
      return;
    }

    const payload = { ...this.registerForm.value };

    this.api.register(payload).subscribe({
      next: (res: any) => {
        this.udata = res.data;
        this.toast.success(res?.message || 'Registration successful ✅', 'Success');
        this.registerForm.reset();

        // Make sure Angular renders modal content first
        this.cdRef.detectChanges();
        // Show the modal
        const modalEl = document.getElementById('exampleModal');
        if (modalEl) {
          const modal = new bootstrap.Modal(modalEl, { backdrop: 'static', keyboard: true });
          modal.show();
        }
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/sign-in']);
        });
        
      },
      error: (err) => {
        this.toast.error(err?.error?.message || 'Registration failed. Please try again.', 'Error');
      }
    });
  }


  getProfileData() {
    this.api.getProfiledata().subscribe((res: any) => {
      this.pffdata = res.data[0];
    });
  }
  // sadasdasdasds
// lll
  GetregistredData(id: any) {
    this.errorMessage = null;
    this.api.getregiddata(id).subscribe({
      next: (res: any) => {
        if (res?.data?.length > 0) {
          this.idData = res.data[0];
          this.errorMessage = null;
        } else {
          this.idData = null;
          this.errorMessage = 'User not found.';
        }
      },
      error: (err) => {
        this.idData = null;
        this.errorMessage = err?.error?.message || 'Something went wrong.';
      }
    });
  }

   

  onRegIdKeyup() {
    const regid = this.registerForm.get('sponcerid')?.value;
    if (regid && regid.length >= 4) {
      this.GetregistredData(regid);
    } else {
      this.idData = null;
      this.errorMessage = null;
    }
  }

  GetregistredData1(id: any) {
    this.errorMessage1 = null;
    this.api.getregiddata(id).subscribe({
      next: (res: any) => {
        if (res?.data?.length > 0) {
          this.idData1 = res.data[0];
          this.errorMessage1 = null;
        } else {
          this.idData1 = null;
          this.errorMessage1 = 'User not found.';
        }
      },
      error: (err) => {
        this.idData1 = null;
        this.errorMessage1 = err?.error?.message || 'Something went wrong.';
      }
    });
  }
  
  onRegIdKeyup1() {
    const regid = this.registerForm.get('placementid')?.value;
    if (regid && regid.length >= 4) {
      this.GetregistredData1(regid); // ✅ fixed
    } else {
      this.idData1 = null;
      this.errorMessage1 = null;
    }
  }
  



  


}
