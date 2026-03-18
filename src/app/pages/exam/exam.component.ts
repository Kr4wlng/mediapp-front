import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MatTableComponent } from '../../shared/mat-table/mat-table.component';
import { Exam } from '../../models/exam';
import { ExamService } from '../../services/exam.service';

@Component({
  selector: 'app-exam',
  imports: [ MaterialModule, MatTableComponent ],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.css',
})
export class ExamComponent implements OnInit{

  exams: Exam[] = [];
  columnsDefinition = [
    { def: 'idExam', label: 'ID' },
    { def: 'nameExam', label: 'Name' },
    { def: 'descriptionExam', label: 'Description' },
    { def: 'actions', label: 'Actions' }
  ];

  constructor(private examService: ExamService){}

  ngOnInit(): void {
    this.examService.findAll().subscribe(data => {
      this.exams = data;
    })
  }

  edit(idExam: number){
    // Lógica para editar examen
  }

  delete(idExam: number){
    // Lógica para eliminar examen
  }

}
