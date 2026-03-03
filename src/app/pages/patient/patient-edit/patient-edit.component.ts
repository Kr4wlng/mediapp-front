import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { PatientService } from '../../../services/patient.service';
import { Patient } from '../../../models/patient';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-patient-edit',
  imports: [MaterialModule, ReactiveFormsModule, RouterLink],
  templateUrl: './patient-edit.component.html',
  styleUrl: './patient-edit.component.css',
})
export class PatientEditComponent implements OnInit{

  form: FormGroup;
  id: number;
  isEdit: boolean;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.form = new FormGroup({
      idPatient: new FormControl(0),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      dni: new FormControl(''),
      address: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl('')
    });

    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.isEdit = data['id'] != null;
      this.initForm();
    });
    
  }

  initForm(){
    // precargar los datos
    this.patientService.findById(this.id).subscribe(data => {
      this.form = new FormGroup({
        idPatient: new FormControl(data.idPatient),
        firstName: new FormControl(data.firstName),
        lastName: new FormControl(data.lastName),
        dni: new FormControl(data.dni),
        address: new FormControl(data.address),
        phone: new FormControl(data.phone),
        email: new FormControl(data.email)
      });
    });
  }

  operate(){
    const patient: Patient = new Patient();
    patient.idPatient = this.form.value['idPatient'];
    // const x = this.form.controls['idPatient'];
    // const y = this.form.get('idPatient').value;
    patient.firstName = this.form.value['firstName'];
    patient.lastName = this.form.value['lastName'];
    patient.dni = this.form.value['dni'];
    patient.phone = this.form.value['phone'];
    patient.address = this.form.value['address'];
    patient.email = this.form.value['email'];

    if(this.isEdit){
      // UPDATE
      // PRACTICA COMUN PERO NO IDEAL
      this.patientService.update(this.id, patient).subscribe( () => {
        this.patientService.findAll().subscribe(data => {
          this.patientService.setPatientChange(data);
          this.patientService.setMessageChange('UPDATED!');
        });
      });

    } else {
      // INSERT
      this.patientService.save(patient)
        .pipe(switchMap( () => {
          return this.patientService.findAll();
        }))
        .subscribe(data => {
          this.patientService.setPatientChange(data);
          this.patientService.setMessageChange('CREATED!');
        });
    }

    this.router.navigate(['pages/patient']);

  }

}
