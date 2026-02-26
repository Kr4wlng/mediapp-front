import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { PatientComponent } from "../patient/patient.component";
import { MedicComponent } from '../medic/medic.component';
import { LoginComponent } from '../../login/login.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MaterialModule, RouterLink, RouterLinkActive, PatientComponent, MedicComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {

}
