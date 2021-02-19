import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public name = ""
  public username = ""
  public password = ""
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  signup = () => {
    this.userService.signup(this.name, this.username, this.password)
    //window.location.replace("http://localhost:4200/login")
  }

}
