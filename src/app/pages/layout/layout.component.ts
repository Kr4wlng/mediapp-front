import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { PatientComponent } from "../patient/patient.component";
import { MedicComponent } from '../medic/medic.component';
import { LoginComponent } from '../../login/login.component';
import { LoginService } from '../../services/login.service';
import { Menu } from '../../models/menu';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MaterialModule, RouterLink, RouterLinkActive, PatientComponent, MedicComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit{

  menus: Menu[];

  constructor(
    private loginService: LoginService,
    private menuService: MenuService
  ){}

  ngOnInit(): void {
    this.menuService.getMenuChange().subscribe(data => this.menus = data);
  }

  logout(){
    this.loginService.logout;
  }

}
