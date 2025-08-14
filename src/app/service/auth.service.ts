import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
// const AUTH_API = 'https://crypturegrid.com/MYUSD/MYUSD/';
const AUTH_API = 'https://myusd.co/MYUSD/MYUSD/';
 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor(private http:HttpClient) { }
 
  login(regid: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'User/Index',
      {
        regid: regid,
        password: password,
      },
      httpOptions
    );
  }
 

 
 
 
}