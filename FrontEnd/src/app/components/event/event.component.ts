import { Component, OnInit } from '@angular/core';
import { EventServiceService } from 'src/app/services/event-service.service';
import {IEvent} from '../../../../../BackEnd/src/Interfaces/IEvent'

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  public events : IEvent[] = []
  constructor(private eventService: EventServiceService) { }

  async ngOnInit() {
    this.events = await this.eventService.all()
  }

}
