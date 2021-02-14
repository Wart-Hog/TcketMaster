import { Component, OnInit } from '@angular/core';
import { EventServiceService } from 'src/app/services/event-service.service';
import { IEvent } from '../../../../../BackEnd/src/Interfaces/IEvent';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {
  public events : IEvent[] = []
  constructor(private eventService: EventServiceService) { }

  async ngOnInit() {
    this.events = await this.eventService.all()
  }
}
