import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { PatientComponent } from "../patient/patient.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MaterialModule, RouterLink, RouterLinkActive, PatientComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {

}
