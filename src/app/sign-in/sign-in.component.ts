import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';

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

  constructor(private fb: FormBuilder, private api: UserService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
      password: ['', Validators.required],
      sponcerid: ['', Validators.required],
      position: ['', Validators.required],
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

  sign(): void {
    if (this.registerForm.valid) {
      const form = this.registerForm.value;
      const payload = {
        sponcerid: form.sponcerid,
        name: form.name,
        phone: form.phone,
        email: form.email,
        password: form.password,
        position: form.position,
        country: form.country,
    
      };

      this.api.register(payload).subscribe({
        next: (res: any) => {
          console.log('res:', res);
          alert('✅ Registration successful!');
          this.registerForm.reset();
        },
        error: (err) => {
          console.error('Registration error:', err);
          const msg = err?.error?.message || '❌ Registration failed. Please try again.';
          alert(msg);
        }
      });
    } else {
      alert('⚠️ Please fill all fields correctly.');
    }
  }

  getProfileData() {
    this.api.getProfiledata().subscribe((res: any) => {
      this.pffdata = res.data[0];
    });
  }
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
}
