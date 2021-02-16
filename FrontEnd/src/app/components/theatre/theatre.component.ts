import { Component, OnInit } from '@angular/core';
import { EventServiceService } from 'src/app/services/event-service.service';
import { UserService } from 'src/app/services/user.service';
import { IEvent } from '../../../../../BackEnd/src/Interfaces/IEvent';

@Component({
  selector: 'app-theatre',
  templateUrl: './theatre.component.html',
  styleUrls: ['./theatre.component.css']
})
export class TheatreComponent implements OnInit {
  public events : IEvent[] = []
  public id = []
  constructor(private eventService: EventServiceService, private userService: UserService) { }

  async ngOnInit() {
    this.events = await this.eventService.getTheatreEvents()
  }
  buyTicket = (i:number) =>{
    sessionStorage.setItem("ticket", this.events[i].id)
    this.userService.buyTicket()
  }
}
