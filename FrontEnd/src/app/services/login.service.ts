import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = "http://localhost:3005/users"
  constructor(private httpClient: HttpClient) { }
  login = (username: string, password: string)=>
   this.httpClient.post<string>(this.url + "/login",{username: username, password: password}).toPromise() as Promise<string>

}
