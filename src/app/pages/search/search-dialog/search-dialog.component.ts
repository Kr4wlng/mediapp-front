import { Component, Inject, OnInit } from '@angular/core';
import { Consult } from '../../../models/consult';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '../../../material/material.module';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-search-dialog',
  imports: [ MaterialModule, DatePipe ],
  templateUrl: './search-dialog.component.html',
  styleUrl: './search-dialog.component.css',
})
export class SearchDialogComponent implements OnInit{

  consult: Consult;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Consult,
  ){}

  ngOnInit(): void {
    this.consult = { ... this.data}
  }

}
