import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { IEvent } from '../../../../BackEnd/src/Interfaces/IEvent';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {
  public url = "http://localhost:3005/events"

  constructor(private httpClient: HttpClient) {}

  all = (): Promise<IEvent[]> => this.httpClient.get(this.url).toPromise() as Promise<IEvent[]>
}
