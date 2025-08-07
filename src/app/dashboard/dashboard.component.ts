import { AfterViewInit, Component } from '@angular/core';
declare var Gauge: any;
import { Chart, registerables } from 'chart.js';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  gaugeValue = 60;
  chart: any;
  showShareIcons = false;
  dashboarddata: any;
  // homedata: any;
  form: FormGroup;
  activationDetails: any;
  // pfdata: any;
  homedata: any = {};
pfdata: any = {};
profiledata: any = {};
  constructor(private api:UserService,private router:Router,private fb:FormBuilder) {
    Chart.register(...registerables);

    this.form = this.fb.group({
      regid: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.createChart();
    this.Home();
    this.activationData();
  }
  createChart() {
    const ctx = document.getElementById('transactionChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['1s', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s', '10s'],
        datasets: [{
          label: 'Transactions/Sec',
          data: [5, 3, 4, 2, 6, 1, 3, 5, 2, 4],
          backgroundColor: '#5082EF',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  ngAfterViewInit(): void {
    const gaugeTarget = document.getElementById('foo') as HTMLCanvasElement;
    if (gaugeTarget) {
      const gaugeOptions = {
        angle: 0,
        lineWidth: 0.3,
        radiusScale: 0.9,
        pointer: {
          length: 0.42,
          strokeWidth: 0.029,
          color: '#000000'
        },
        limitMax: true,
        limitMin: true,
        colorStart: '#6F6EA0',
        colorStop: '#C0C0DB',
        strokeColor: '#EEEEEE',
        generateGradient: true,
        staticZones: [
          { strokeStyle: "#C80036", min: 0, max: 30 },
          { strokeStyle: "#F03E3E", min: 30, max: 50 },
          { strokeStyle: "#FF8800", min: 50, max: 70 },
          { strokeStyle: "#FFDD00", min: 70, max: 85 },
          { strokeStyle: "#30B32D", min: 85, max: 100 }
        ]
      };

      const gauge = new Gauge(gaugeTarget).setOptions(gaugeOptions);
      gauge.maxValue = 100;
      gauge.setMinValue(0);
      gauge.animationSpeed = 10;
      gauge.set(this.gaugeValue);
    }

    // ===== Line Chart Initialization =====
    const lineCanvas = document.getElementById('summaryChart') as HTMLCanvasElement;
    if (lineCanvas) {
      const ctx = lineCanvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(0, 85, 255, 0.5)');
        gradient.addColorStop(1, 'rgba(0, 85, 255, 0.05)');

        new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['10:30', '11:00', '11:30', '12:00', '12:30', '01:00', '01:30'],
            datasets: [{
              data: [5, 4, 15, 2, 0, 14, 16],
              backgroundColor: gradient,
              borderColor: '#0050ff',
              tension: 0.4,
              fill: true,
              pointRadius: 0
            }]
          },
          options: {
            plugins: {
              legend: { display: false }
            },
            scales: {
              x: {
                grid: { display: false }
              },
              y: {
                beginAtZero: true,
                ticks: { stepSize: 2 }
              }
            }
          }
        });
      }
    }
  }
  toggleShare() {
    this.showShareIcons = !this.showShareIcons;
  }
  Home() {
 this.api.home().subscribe((res:any)=>{
  console.log('pfdata',res);
  this.homedata=res.data;
  this.pfdata=res.data.profiledata;
 })
  }
  

  Subscription() {
    const payload = {
      regid: this.form.value.regid
    };
     console.log("payload:",payload);
    this.api.subscription(payload).subscribe({
      next: (response) => {
        console.log('Activation successful:', response);
      },
      error: (error) => {
        console.error('Activation failed:', error);
      }
    });
  }
  
  activationData(): void {
    this.api.ActivationData().subscribe({
      next: (res:any) => {
        console.log('Activation data:', res);
        this.activationDetails = res.data;
      },
      error: (err) => {
        console.error('Failed to fetch activation data:', err);
      }
    });
  }
  

 
  
    enteredAmount: any | null = null;
    receivableAmount: number = 0;
  
    onAmountChange() {
      if (this.enteredAmount && this.enteredAmount >= 10) {
        const fee = (this.enteredAmount * 10) / 100;
        this.receivableAmount = this.enteredAmount - fee;
      } else {
        this.receivableAmount = 0;
      }
    }

      sharwahtsapp(regid:any){
    const textToShare = `Welcome to MYUSD Family! Please click the link below to join our team for SignUp:  https://myusd.co.in/authshare/${regid}`;
    const encodedText = encodeURIComponent(textToShare);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  }

  //  copyValue(value: string): void {
  //   this.clipboard.copy(value);
  // }
  
  
  }
  


