import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { IUser } from '../../../../../BackEnd/src/Interfaces/IUser';
import { ITicket } from '../../../../../BackEnd/src/Interfaces/ITicket';
import { UserService } from 'src/app/services/user.service';
import { IEvent } from '../../../../../BackEnd/src/Interfaces/IEvent';
import { EventServiceService } from 'src/app/services/event-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user!:IUser 
  tickets:ITicket[] = []
  username = ""
  admin = false
  name = ""
  password = ""
  type = ""
  place = ""
  dateTime =""
  price: any
  eventId = ""
  errorMessage = ""
  errorEventMessage = ""
  errorModifyAdmin = ""
  constructor(private loginService: LoginService,private userService: UserService, private eventService:EventServiceService) { }

  async ngOnInit(){
    this.user = await this.loginService.getUser()
    this.tickets = await this.userService.myTickets()
    this.username = this.user.username
  }
  removeTicket = (i:number) =>{
    sessionStorage.setItem("ticketID", this.tickets[i].id)
    this.userService.removeTicket()
    window.location.reload()
  }
  async makeAdmin (){
    try {
      await this.userService.modifyAdmin(this.admin, this.username)
      window.location.reload()
    } catch (error) {
      this.errorModifyAdmin="utente non trovato"
      return
    }
    
  }
  async createEvent() {
    try{
      this.changeDataFormat()
      await this.eventService.newEvent(this.name, this.type, this.place, this.dateTime, this.price)
      window.location.replace('http://localhost:4200')
    }catch(error: any){
      this.errorEventMessage="dati errati"
      return
    }
  }
  deleteEvent = () => {
    this.eventService.deleteEvent(this.eventId)
    window.location.reload()
  }
  changeDataFormat =() =>{
    let newDate = this.dateTime.split("-")
    this.dateTime =  newDate[2] + "-" + newDate[1] + "-" + newDate[0]
  }
  async modifyUser() {
    try{
      await this.userService.modifyUser(this.name, this.username, this.password)
      sessionStorage.setItem("username", this.username)
      window.location.reload()
    }catch(error: any){
      this.errorMessage="username già esistente o password invalida"
      return
    }
  }

}
