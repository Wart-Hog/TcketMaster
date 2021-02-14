import { Component, OnInit } from '@angular/core';
import { EventServiceService } from 'src/app/services/event-service.service';
import { IEvent } from '../../../../../BackEnd/src/Interfaces/IEvent';

@Component({
  selector: 'app-theatre',
  templateUrl: './theatre.component.html',
  styleUrls: ['./theatre.component.css']
})
export class TheatreComponent implements OnInit {
  public events : IEvent[] = []
  constructor(private eventService: EventServiceService) { }

  async ngOnInit() {
    this.events = await this.eventService.getTheatreEvents()
  }
}
