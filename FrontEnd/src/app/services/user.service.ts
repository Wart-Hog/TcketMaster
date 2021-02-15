import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { ITicket } from '../../../../BackEnd/src/Interfaces/ITicket';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = "http://localhost:3005/users"
  username = sessionStorage.getItem('username')
  ticket = sessionStorage.getItem('ticket')
  constructor(private httpClient: HttpClient) { }
  myTickets = ():Promise<ITicket[]> => this.httpClient.get(`${this.url}/${this.username}/tickets`).toPromise() as Promise<ITicket[]>

  buyTicket = ():Promise<any> => {
  let headers = new HttpHeaders()
  headers = headers.set('token',sessionStorage.getItem('token') || "")
  return this.httpClient.post(`${this.url}/${this.username}/tickets`, {eventId: this.ticket },{headers}).toPromise() as Promise<any>
  }
}
