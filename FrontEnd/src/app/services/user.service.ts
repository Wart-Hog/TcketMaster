import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { ITicket } from '../../../../BackEnd/src/Interfaces/ITicket';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = "http://localhost:3005/users"
  username = sessionStorage.getItem('username')
  constructor(private httpClient: HttpClient) { }
  myTickets = ():Promise<ITicket[]> =>{
    let headers = new HttpHeaders()
    headers = headers.set('token',sessionStorage.getItem('token') || "")
    return this.httpClient.get(`${this.url}/${this.username}/tickets`,{headers}).toPromise() as Promise<ITicket[]>
  } 

  buyTicket = ():Promise<any> => {
    let headers = new HttpHeaders()
    headers = headers.set('token',sessionStorage.getItem('token') || "")
    return this.httpClient.post(`${this.url}/${this.username}/tickets`, {eventId: sessionStorage.getItem('ticket') },{headers}).toPromise() as Promise<any>
  }
  removeTicket = ():Promise<any> => {
    let headers = new HttpHeaders()
    headers = headers.set('token',sessionStorage.getItem('token') || "")
    let ticketId = sessionStorage.getItem('ticketID')
    console.log(ticketId)
    return this.httpClient.delete(`${this.url}/${this.username}/tickets/${ticketId}`,{headers}).toPromise() as Promise<any>
  }
}
