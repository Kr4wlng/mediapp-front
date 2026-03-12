import { Component, Inject, OnInit } from '@angular/core';
import { Consult } from '../../../models/consult';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '../../../material/material.module';
import { DatePipe } from '@angular/common';
import { ConsultService } from '../../../services/consult.service';
import { Exam } from '../../../models/exam';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-dialog',
  imports: [ MaterialModule, DatePipe ],
  templateUrl: './search-dialog.component.html',
  styleUrl: './search-dialog.component.css',
})
export class SearchDialogComponent implements OnInit{

  consult: Consult;
  exams: Exam[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Consult,
    private consultService: ConsultService
  ){}

  ngOnInit(): void {
    this.consult = { ... this.data};
    this.consultService.getExamsByIdConsult(this.consult.idConsult).subscribe(data => this.exams = data);
  }

}
