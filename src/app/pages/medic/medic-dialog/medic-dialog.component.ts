import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MaterialModule } from '../../../material/material.module';
import { FormsModule } from '@angular/forms';
import { Medic } from '../../../models/medic';
import { SpecialtyService } from '../../../services/specialty.service';
import { Specialty } from '../../../models/specialty';
import { MedicService } from '../../../services/medic.service';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-medic-dialog',
  imports: [ MaterialModule, FormsModule ],
  templateUrl: './medic-dialog.component.html',
  styleUrl: './medic-dialog.component.css',
})
export class MedicDialogComponent implements OnInit{

  medic: Medic;
  specialties: Specialty[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Medic,
    private specialtyServices: SpecialtyService,
    private _dialogRef: MatDialogRef<MedicDialogComponent>,
    private medicService: MedicService
  ){}

  ngOnInit(): void {
    this.medic = { ...this.data };
    /* this.medic = this.data;
    this.medic = new Medic();
    this.medic.idMedic = this.data.idMedic;
    this.medic.idSpecialty = this.data.idSpecialty;
    this.medic.primaryName = this.data.primaryName
    this.medic.surname = this.data.surname;
    this.medic.photo = this.data.photo; */

    this.specialtyServices.findAll().subscribe(data => this.specialties = data);
  }

  close(){
    this._dialogRef.close();
  }

  operate(){
    if(this.medic != null && this.medic.idMedic > 0){
      // UPDATE
      this.medicService.update(this.medic.idMedic, this.medic)
      .pipe(switchMap( () => this.medicService.findAll()))
      .subscribe(data => {
        this.medicService.setMedicChange(data);
        this.medicService.setMessageChange('UPDATED!')
      });
    } else {
      // INSERT
      this.medicService.save(this.medic)
      .pipe(switchMap( () => this.medicService.findAll()))
      .subscribe(data => {
        this.medicService.setMedicChange(data);
        this.medicService.setMessageChange('CREATED!')
      });
    }

    this.close();

  }

}
