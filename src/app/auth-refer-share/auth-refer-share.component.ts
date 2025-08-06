import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { ActivatedRoute } from '@angular/router';
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
    form1!:FormGroup
  id:any;
  countries: any;
    constructor(private fb: FormBuilder, private api: UserService, private activeroute:ActivatedRoute) {}
  
    ngOnInit(): void {
       this.id = this.activeroute.snapshot.params['regid'];
         this.Country();
      this.getProfileData();
  
      this.registerForm = this.fb.group({
        name: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        country: ['', Validators.required],
        password: ['', Validators.required],
        sponcerid: [this.id],
        position: ['', Validators.required],
   
      });
  
      this.form1 = this.fb.group({
        regid: ['', Validators.required],
        amount: ['', Validators.required],
        remark: ['transfer to other user']
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
          country: form.country
        };
    
        this.api.register(payload).subscribe({
          next: (res: any) => {
            console.log('res:', res);
            alert('✅ Registration successful!');
            this.registerForm.reset(); // Optional: clear form after success
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
        console.log(regid);
      } else {
        this.idData = null;
        this.errorMessage = null;
      }
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
  
