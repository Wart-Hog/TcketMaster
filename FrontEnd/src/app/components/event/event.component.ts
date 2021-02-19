import { Component, Input, OnInit } from '@angular/core';
import { EventServiceService } from 'src/app/services/event-service.service';
import { UserService } from 'src/app/services/user.service';
import {IEvent} from '../../../../../BackEnd/src/Interfaces/IEvent'

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  public events : IEvent[] = []
  isLogged = false
  constructor(private eventService: EventServiceService, private userService: UserService) {}
  async ngOnInit() {
    this.events = await this.eventService.all()
  }

  buyTicket = (i:number) =>{
    sessionStorage.setItem("ticket", this.events[i].id)
    this.userService.buyTicket()
    window.location.replace('http://localhost:4200/user')
  }
  checkLogged = () =>{
    this.isLogged = sessionStorage.getItem("token") ? false : true
  }
}
