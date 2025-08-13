import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-auth-refer-share',
  templateUrl: './auth-refer-share.component.html',
  styleUrls: ['./auth-refer-share.component.scss']
})
export class AuthReferShareComponent {

    selectedPosition: string = '';
  
    registerForm!: FormGroup;
    pffdata: any;
    errorMessage: any;
    idData: any;
        errorMessage1: any;
    idData1: any;
    form1!:FormGroup
  id:any;
   numbercode:any;
  countries: string[] = [];
  codes: any[] = [];
  CountryCode: string = '';
    constructor(private fb: FormBuilder,private router:Router, private api: UserService, private activeroute:ActivatedRoute,private toast:ToastrService) {
        this.registerForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
      password: ['', Validators.required],
      sponcerid: [this.id],
      position: ['Left', Validators.required], // Set default value to 'Left'
      placementid: ['', Validators.required],
      terms:['', Validators.required],
    });
    }
  
    ngOnInit(): void {
       this.id = this.activeroute.snapshot.params['regid'];
         this.Country();
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
  
    sign(): void {
      if (this.registerForm.invalid) {
        this.toast.warning('Please fill all fields correctly.', 'Validation Error');
        return;
      }
    
      const form = this.registerForm.value;
      const payload = {
        sponcerid: form.sponcerid,
        name: form.name,
        phone: form.phone,
        email: form.email,
        password: form.password,
        position: form.position,
        country: form.country,
        placementid: form.placementid
      };
    
      this.api.register(payload).subscribe({
        next: (res: any) => {
          console.log('Registration Response:', res);
          this.toast.success(res?.message || 'Registration successful ✅', 'Success');
          this.registerForm.reset();
          // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          //   this.router.navigate(['/authshare']);
          // });
        },
        error: (err) => {
          console.error('Registration error:', err);
          this.toast.error(err?.error?.message || 'Registration failed. Please try again.', 'Error');
        }
      });
    }
    
    
  
    getProfileData() {
      this.api.getregiddata(this.id).subscribe((res: any) => {
        this.pffdata = res.data[0];
      });
    }
  
    GetregistredData(id: any) {
      this.errorMessage = null;
      this.api.getregiddata(id).subscribe({
        next: (res: any) => {
          console.log("regid:",res);
          
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
      const regid = this.registerForm.get('placementid')?.value;
      if (regid && regid.length >= 4) {
        this.GetregistredData(regid);
      } else {
        this.idData = null;
        this.errorMessage = null; // No error until they try a real search
      }
    }

      getCountries() {
       this.api.getCountries().subscribe({
      next: (res: any) => {
        this.codes = res;

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

      Country() {
    this.api.getCountries().subscribe({
      next: (res: any) => {
        this.countries = res.map((country: { name: { common: any; }; }) => country.name?.common).filter(Boolean).sort();
        console.log("Country List:", this.countries);
      },
      error: (err) => {
        console.error('API Error:', err);
      }
    });
  }


    
    
  }
  
