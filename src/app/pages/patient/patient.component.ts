import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient';

@Component({
  selector: 'app-patient',
  imports: [],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css',
})
export class PatientComponent implements OnInit{

  constructor(private patientService: PatientService){}

  patients: Patient[] = []

  ngOnInit(): void{
    this.patientService.findAll().subscribe((data) => {this.patients = data, console.log(data)});
  }

}
