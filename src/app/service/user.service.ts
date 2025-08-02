import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly AUTH_API = 'https://crypturegrid.com/MYUSD/MYUSD/User/';

  constructor(
    private http: HttpClient,
    private route: Router,
    private authService: AuthService,
    private token:TokenService
  ) {}

  register(value: {
    sponcerid: string;
    name: string;
    phone: string;
    email: string;
    password: string;
    position: string;
    country: string;
  }) {
    const token = this.token.getToken(); // ⛳ Optional: If token is required
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }) // Use token only if exists
      }),
    };

    return this.http.post(
      this.AUTH_API + 'Register',
      {
        sponcerid: value.sponcerid,
        name: value.name,
        phone: value.phone,
        email: value.email,
        password: value.password,
        position: value.position,
        country: value.country,
      },
      httpOptions
    );
  }


  home() {
    const token = this.token.getToken(); 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }),
    };
  
    return this.http.get(this.AUTH_API + 'Home', httpOptions);
  }
  forgotPassword(value: { regid: string; email: string }) {
    const token = this.token.getToken(); // optional if required
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }) // include only if token exists
      }),
    };
    return this.http.post(
      this.AUTH_API + 'Forget_password',
      {
        regid: value.regid,
        email: value.email,
      },
      httpOptions
    );
  }


  }



