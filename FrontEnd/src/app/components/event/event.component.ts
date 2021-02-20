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
  offset = 0
  limit = 3
  pages = 0
  isVisibleNext :any
  isVisiblePrev :any
  constructor(private eventService: EventServiceService, private userService: UserService) {}
  async ngOnInit() {
    //this.checkOffset()
    this.events = await this.eventService.all(this.offset, this.limit)
    this.isVisiblePrev = this.offset > 0 ? true : false
    this.isVisibleNext = this.events.length == this.limit ? true : false
    console.log("lenght" , this.events.length)
    
    
    //this.pages = Math.ceil(count / this.limit);
  }

  buyTicket = (i:number) =>{
    sessionStorage.setItem("ticket", this.events[i].id)
    this.userService.buyTicket()
    window.location.replace('http://localhost:4200/user')
  }
  checkLogged = () =>{
    this.isLogged = sessionStorage.getItem("token") ? false : true
  }
  async prev(){
    this.offset = this.offset - this.limit;
    //this.events = [];
    this.ngOnInit();
  }
  next = async () => {
    this.offset = this.offset + this.limit;
    //if(this.offset > this.events.length) this.isVisble = false
    //this.events = [];
    console.log("Prev prima",this.isVisiblePrev)
    console.log("Next prima",this.isVisibleNext)
    this.ngOnInit();
    console.log("Prev dopo",this.isVisiblePrev)
    console.log("Next dopo",this.isVisibleNext)
  }
  
}
