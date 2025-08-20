import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tree-registration',
  templateUrl: './tree-registration.component.html',
  styleUrls: ['./tree-registration.component.scss']
})
export class TreeRegistrationComponent {

    selectedPosition: string = '';
    
      registerForm!: FormGroup;
      pffdata: any;
      errorMessage: any;
      idData: any;
          errorMessage1: any;
      idData1: any;
      form1!:FormGroup;
    id:any;
     numbercode:any;
    countries: string[] = [];
    codes: any[] = [];
    CountryCode: string = '';
    hpdata:any;
    regid:any;
    position:any;
      constructor(private fb: FormBuilder,private router:Router, private api: UserService, private activeroute:ActivatedRoute,private toast:ToastrService) {
          this.registerForm = this.fb.group({
        name: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        country: ['', Validators.required],
        password: ['', Validators.required],
        sponcerid: [''],
        position: [''], // Set default value to 'Left'
        placementid: ['',],
        terms:['', Validators.required],
      });
      }
    
      ngOnInit(): void {
          this.regid = this.activeroute.snapshot.paramMap.get('regid') || '';
          console.log("regid:",this.regid);
          
    this.position = this.activeroute.snapshot.paramMap.get('position') || '';
           this.Country();
           this.getCountries();
        this.getProfileData();

     this.api.getProfiledata().subscribe((res: any) => {
      console.log("profiledata:", res);
      this.hpdata = res.data[0];
      console.log("pffdata:", this.hpdata);
    });

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
               const newRegId = this.regid; 
            this.toast.success(res?.message || 'Registration successful ✅', 'Success');
            this.registerForm.reset();
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                 this.router.navigate([`/treeview/${newRegId}`]);
            });
          },
          error: (err) => {
            console.error('Registration error:', err);
            this.toast.error(err?.error?.message || 'Registration failed. Please try again.', 'Error');
          }
        });
      }
      
      
    
      getProfileData() {
        this.api.getregiddata(this.regid).subscribe((res: any) => {
          this.pffdata = res.data[0];
          console.log("gfhd:",this.pffdata)
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
