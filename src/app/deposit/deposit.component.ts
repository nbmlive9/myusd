import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../service/token.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  ddata:any;
  constructor(private api:UserService, private http:HttpClient, private token:TokenService, private router:Router,   private fb: FormBuilder, private sanitizer: DomSanitizer){
    this.form = this.fb.group({
      amount: [''],
      transno:[''],
      note:['nowpayments url']
    });
  }

ngOnInit() {
 this.loadPayments();
 this.api.DepositeData().subscribe((res:any)=>{
    console.log('depositdata',res);
    this.ddata=res.data;
 })
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
  const transno = String(this.form.value.transno);

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-api-key': 'PN033X5-111M6Z6-MD7XF60-7Q5W7RW'
  });

  this.http.post<any>('https://api.nowpayments.io/v1/payment', {
    price_amount: amount,
    price_currency: 'usd',
    pay_currency: 'usdtbsc',
    ipn_callback_url: 'https://myusd.co/payment/callback'
  }, { headers }).subscribe({
    next: (res) => {
      console.log('Payment details', res);
      this.paymentInfo = res; // save payment info for QR & status check
      this.submitting = false;
    },
    error: (err) => {
      console.error(err);
      this.submitting = false;
    }
  });
}

/** Step 3: Call backend API to credit wallet */
onSubmit(amount: number, transno: string) {
  this.submitting = true;

  const payload = {
    amount: amount.toString(),  // ✅ convert number to string
    transno: transno,           // ✅ NOWPayments payment_id
    note: this.form.value.note || 'NOWPayments deposit'
  };

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




  // 📋 Copy Address
  copyAddress() {
    navigator.clipboard.writeText(this.paymentInfo.pay_address).then(() => {
      alert('Address copied to clipboard!');
    });
  }

  // 📲 Share on WhatsApp
  shareOnWhatsApp() {
    const message = `Send Only USDT BEP20 for $${this.paymentInfo.price_amount} Deposit\n\nWallet Address:\n${this.paymentInfo.pay_address}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

/** Step 2: Check payment status */
checkPaymentStatus() {
  this.checkingStatus = true;
  if (!this.paymentInfo?.payment_id) return;

  this.checkingStatus = true;
      setTimeout(() => {
      this.checkingStatus = false;
      alert('Payment status checked (demo).');
    }, 2000);
  
// testt

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
        // ✅ Pass actual paid amount & payment ID to backend
        this.onSubmit(res.actually_paid, res.payment_id);
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




}
