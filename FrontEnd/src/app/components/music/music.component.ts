import { Component, OnInit } from '@angular/core';
import { EventServiceService } from 'src/app/services/event-service.service';
import { UserService } from 'src/app/services/user.service';
import { IEvent } from '../../../../../BackEnd/src/Interfaces/IEvent';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {
  public events : IEvent[] = []
  public id = "ciao"
  constructor(private eventService: EventServiceService, private userService: UserService) { }

  async ngOnInit() {
    this.events = await this.eventService.getMusicEvents()
  }

  buyTicket = () =>{
    sessionStorage.setItem("ticket", this.id )
    //this.userService.buyTicket()
  }
}
