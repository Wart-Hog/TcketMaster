import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { IUser } from '../../../../../BackEnd/src/Interfaces/IUser';
import { ITicket } from '../../../../../BackEnd/src/Interfaces/ITicket';
import { UserService } from 'src/app/services/user.service';
import { IEvent } from '../../../../../BackEnd/src/Interfaces/IEvent';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user!:IUser 
  tickets:ITicket[] = []
  constructor(private loginService: LoginService,private userService: UserService) { }

  async ngOnInit(){
    this.user = await this.loginService.getUser()
    this.tickets = await this.userService.myTickets()
  }
  removeTicket = (i:number) =>{
    sessionStorage.setItem("ticketID", this.tickets[i].id)
    this.userService.removeTicket()
    window.location.reload()
  }
}
