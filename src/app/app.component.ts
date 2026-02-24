import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PatientComponent } from './pages/patient/patient.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PatientComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class App {
  protected readonly title = signal('mediapp-front');
}
