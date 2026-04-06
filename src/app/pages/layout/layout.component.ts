import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { PatientComponent } from "../patient/patient.component";
import { MedicComponent } from '../medic/medic.component';
import { LoginComponent } from '../../login/login.component';
import { LoginService } from '../../services/login.service';
import { Menu } from '../../models/menu';
import { MenuService } from '../../services/menu.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MaterialModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit{

  menus: Menu[];
  username: string;

  constructor(
    private loginService: LoginService,
    private menuService: MenuService,
  ){}

  ngOnInit(): void {
  const helper = new JwtHelperService();
    const token = sessionStorage.getItem(environment.TOKEN_NAME);
    const decodedToken = helper.decodeToken(token);

    this.username = decodedToken.sub;

    this.menuService.getMenusByUser(this.username).subscribe((data) => {
      this.menus = data;
      console.log(data);
    });
    console.log(this.menus)
  }

  logout(){
    this.loginService.logout();
  }

}
