import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MaterialModule } from '../../../material/material.module';
import { FormsModule } from '@angular/forms';
import { Medic } from '../../../models/medic';


@Component({
  selector: 'app-medic-dialog',
  imports: [ MaterialModule, FormsModule ],
  templateUrl: './medic-dialog.component.html',
  styleUrl: './medic-dialog.component.css',
})
export class MedicDialogComponent implements OnInit{

  medic: Medic;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Medic
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
  }

}
