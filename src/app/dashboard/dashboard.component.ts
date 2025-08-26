import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  showShareIcons = false;
  dashboarddata: any;
  homedata: any;
  form: FormGroup;
  activationDetails: any;
  pfdata: any;
  enteredAmount: any | null = null;
  receivableAmount: number = 0;
  sdata: any;
  constructor(
    private api: UserService,
    private router: Router,
    private fb: FormBuilder,
    private toast:ToastrService
  ) {
    this.form = this.fb.group({
      regid: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.Home();
    this.activationData();
  }
  toggleShare() {
    this.showShareIcons = !this.showShareIcons;
  }
  Home() {
    this.api.home().subscribe({
      next: (res: any) => {
        console.log('Home API response:', res);

        if (res && res.data) {
          this.dashboarddata = res;
          this.homedata = res.data;
          this.pfdata = res.data.profiledata;
          console.log('home:', this.pfdata);
        } else {
          console.warn('Unexpected API response structure:', res);
          this.homedata = null;
          this.pfdata = null;
        }
      },
      error: (err) => {
        console.error('Home API error:', err);
      },
    });
  }

  Subscription(): void {
    const payload = { regid: this.form.value.regid };
    console.log('Payload:', payload);
  
    this.api.subscription(payload).subscribe({
      next: (res: any) => {
        console.log('Subscription successful:', res);
        this.toast.success(res?.message || 'Subscription successful ✅', 'Success');
        this.sdata=res;
        // Refresh dashboard
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/dashboard']);
        });
        this.sdata=null
      },
      error: (err) => {
        console.error('Activation failed:', err);
        this.toast.error(  'Subscription failed  you have low Balance ', 'Error');
      
      },
    });
  }
  

  noData: boolean = false;
  
  activationData(): void {
    this.noData = false; // reset before loading
    this.api.ActivationData().subscribe({
      next: (res: any) => {
        console.log('Activation data:', res);
        this.activationDetails = res?.data || [];
        this.noData = this.activationDetails.length === 0;
      },
      error: (err) => {
        console.error('Failed to fetch activation data:', err);
        this.activationDetails = [];
        this.noData = true;
      },
    });
  }
  

  onAmountChange() {
    if (this.enteredAmount && this.enteredAmount >= 5) {
      const fee = (this.enteredAmount * 0) / 100;
      this.receivableAmount = this.enteredAmount - fee;
    } else {
      this.receivableAmount = 0;
    }
  }

  sharwahtsapp(regid: any) {
    const textToShare = `Welcome to MYUSD Family! Please click the link below to join our team for SignUp:  https://myusd.co.in/authshare/${regid}`;
    const encodedText = encodeURIComponent(textToShare);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  }

  //  copyValue(value: string): void {
  //   this.clipboard.copy(value);
  // }


    showDashboard = false; 
    openDashboard() {
      this.showDashboard = true;
    }

}
