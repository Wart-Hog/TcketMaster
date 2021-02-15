import { Component, OnInit } from '@angular/core';
import { EventServiceService } from 'src/app/services/event-service.service';
import { IEvent } from '../../../../../BackEnd/src/Interfaces/IEvent';

@Component({
  selector: 'app-sport',
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.css']
})
export class SportComponent implements OnInit {

  public events : IEvent[] = []
  constructor(private eventService: EventServiceService) { }

  async ngOnInit() {
    this.events = await this.eventService.getSportEvents()
  }

}
