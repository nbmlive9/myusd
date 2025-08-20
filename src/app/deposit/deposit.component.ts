import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../service/token.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as QRCode from 'qrcode-generator';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent {
 form: FormGroup;
  submitting = false;
   qrDataUrl: SafeUrl = '';
  paymentInfo: any = null;       // stores NOWPayments payment object
  paymentAddress: string = '';  // stores the NOWPayments payment object
  qrCodeDataUrl: SafeUrl = ''; // QR code for pay_address
  checkingStatus = false;
   payments: any[] = [];
  loading = false;
  errorMsg = '';
  constructor(private api:UserService, private http:HttpClient, private token:TokenService, private router:Router,   private fb: FormBuilder, private sanitizer: DomSanitizer){
    this.form = this.fb.group({
      amount: [''],
      transno:[''],
      note:['nowpayments url']
    });
  }

ngOnInit() {
 this.loadPayments();
}

loadPayments() {
  this.loading = true;
  this.errorMsg = '';

  const token = this.token.getToken();
  if (!token) {
    this.errorMsg = 'No token found. Please login again.';
    this.loading = false;
    return;
  }

  this.api.getPayments(token).subscribe({
    next: (res: any) => {
      console.log('Payments data:', res);
      this.payments = res.data || [];
      this.loading = false;
    },
    error: (err: any) => {
      console.error('Payment history error:', err);
      this.errorMsg = 'Failed to fetch payment history.';
      this.loading = false;
    }
  });
}


  // Example Angular service

// Call NOWPayments API
    /** Step 1: Generate NOWPayments invoice */

async generatePayment() {
  if (this.form.invalid) return;

  this.submitting = true;
  const amount = Number(this.form.value.amount);

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-api-key': 'PN033X5-111M6Z6-MD7XF60-7Q5W7RW'
  });

  this.http.post<any>('https://api.nowpayments.io/v1/payment', {
    price_amount: amount,
    price_currency: 'usd',
    pay_currency: 'usdtbsc',
    ipn_callback_url: 'https://yourapp.com/payment/callback'
  }, { headers }).subscribe({
    next: (res) => {
      console.log('payment details', res);
      this.paymentInfo = res;  // contains payment_id, payment_status, price_amount
      this.submitting = false;
    },
    error: (err) => {
      console.error(err);
      this.submitting = false;
    }
  });
}

/** Step 2: Check payment status */
checkPaymentStatus() {
  if (!this.paymentInfo?.payment_id) return;

  this.checkingStatus = true;
  const headers = new HttpHeaders({
    'x-api-key': 'PN033X5-111M6Z6-MD7XF60-7Q5W7RW'
  });

  this.http.get<any>(
    `https://api.nowpayments.io/v1/payment/${this.paymentInfo.payment_id}`,
    { headers }
  ).subscribe({
    next: (res) => {
      this.checkingStatus = false;
      console.log('Payment status:', res);

      if (res.payment_status === 'finished') {
        alert('Deposit successful! ✅');
        // After success → call your API to load funds
        this.onSubmit(res.price_amount, res.payment_id);
      } else if (res.payment_status === 'failed') {
        alert('Payment failed ❌. Please try again.');
      } else {
        alert('Payment is still pending ⏳.');
      }
    },
    error: (err) => {
      console.error(err);
      this.checkingStatus = false;
    }
  });
}

/** Step 3: Call backend API to credit wallet */
onSubmit(amount: number, transno: string) {
  this.submitting = true;

  const payload = {
    amount: this.form.value.amount,
    transno: this.form.value.transno,
    note: this.form.value.note
  };
this.checkPaymentStatus();
  this.api.DepositWallet(payload).subscribe({
    next: (res) => {
      console.log('Wallet updated:', res);
      this.submitting = false;

      alert('Wallet credited successfully 🎉');
      this.paymentInfo = null;
      this.form.reset();
      this.router.navigate(['/deposit']);
    },
    error: (err) => {
      console.error('Deposit error:', err);
      this.submitting = false;
    }
  });
}



}
