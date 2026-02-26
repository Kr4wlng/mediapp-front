import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css',
})
export class PatientComponent implements OnInit{

  constructor(private patientService: PatientService){}

  patients: Patient[] = [];
  dataSource: MatTableDataSource<Patient>;
  // displayedColumns: string[] = ['idPatient', 'firstName', 'lastName', 'dni'];
  columnsDefinitions = [
    { def: 'idPatient', label: 'idPatient', hide: true },
    { def: 'firstName', label: 'firstName', hide: false },
    { def: 'lastName', label: 'lastName', hide: false },
    { def: 'dni', label: 'dni', hide: false },
    { def: 'actions', label: 'actions', hide: false }
  ]

  ngOnInit(): void{
    this.patientService.findAll().subscribe((data) => {this.dataSource = new MatTableDataSource(data)});
  }

  getDisplayedColumns() {
    return this.columnsDefinitions.filter(cd => !cd.hide).map(cd => cd.def);
  }

}
