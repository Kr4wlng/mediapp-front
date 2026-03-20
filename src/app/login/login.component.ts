import { Component } from '@angular/core';
import { MatCard } from "@angular/material/card";
import { MaterialModule } from '../material/material.module';
import { RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-login',
  imports: [MaterialModule, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  username: string;
  password: string;

  constructor(
    private loginService: LoginService
  ){}

  login(){
    this.loginService.login(this.username, this.password).subscribe(data => {
      // console.log(data);
      sessionStorage.setItem(environment.TOKEN_NAME, data.access_token);

      // let token: string = sessionStorage.getItem(environment.TOKEN_NAME);
    });
  }

}
