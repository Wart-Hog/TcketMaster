import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username = ""
  public password = ""
  public token = ""
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  async login (){
    this.token = await this.loginService.login(this.username, this.password)
    sessionStorage.setItem("token", this.token)
    sessionStorage.setItem("username", this.username)
    if (this.token != "") window.location.replace('http://localhost:4200/user')
    
  }
}
