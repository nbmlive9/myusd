import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent  implements OnInit{

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private branchService: ServiceService) {}

  ngOnInit(): void {
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
  
      this.branchService.register(payload).subscribe({
        next: res =>
        console.log("res:",res)
      });
    } else {
      alert('Please fill all fields correctly.');
    }
  }
  
}
