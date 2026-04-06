import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { Exam } from '../../models/exam';
import { ExamService } from '../../services/exam.service';
import { MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MenuService } from '../../services/menu.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-exam',
  standalone:true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.css',
})
export class ExamComponent implements OnInit {
  // displayedColumns: string[] = ['nameExam', 'descriptionExam', 'actions'];
  dataSource: MatTableDataSource<Exam>;
  exams: Exam[]=[];
  totalElements: number = 0;
  columnsDefinitions = [
    { def: 'idExam', label: 'idExam', hide: true },
    { def: 'nameExam', label: 'nameExam', hide: false },
    { def: 'descriptionExam', label: 'descriptionExam', hide: false },
    { def: 'actions', label: 'actions', hide: false }
  ]

  constructor(
    private examService: ExamService,
    private menuService: MenuService,
    private _snackBar: MatSnackBar,
  ) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {

    this.examService.listPageable(0, 5).subscribe(data => this.createTable(data));

    this.examService.getExamChange().subscribe(data => this.createTable(data));
    
    this.examService.getMessageChange().subscribe(data => {
      this._snackBar.open(data, 'INFO', {
        duration: 2000, 
        verticalPosition: 'top', 
        horizontalPosition: 'right'
      });
    });

    /* this.examService.findAll().subscribe(data => {
      this.createTable(data);
      console.log(data);
    });

    this.examService.getExamChange().subscribe(data => this.createTable(data));
    this.examService.getMessageChange().subscribe(data => {
      this._snackBar.open(data, 'INFO', {duration: 2000, verticalPosition: 'top', horizontalPosition: 'right'})
    });
    // this.loadExams(); */
  }

  createTable(data: any) {
    if (Array.isArray(data)) {
      this.totalElements = data.length;
      this.dataSource = new MatTableDataSource(data);
    } else {
      this.totalElements = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
    }
    
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getDisplayedColumns() {
    return this.columnsDefinitions.filter(cd => !cd.hide).map(cd => cd.def);
  }

  /* loadExams(): void {
    this.examService.findAll().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
        this.dataSource.data = data;
        this.cdr.detectChanges();
        console.log('DataSource actualizado:', this.dataSource.data);
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  } */

  applyFilter(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }

  delete(idExam: number): void {
    console.log('Eliminar:', idExam);
  }

  showMore(e: any) {
    this.examService.listPageable(e.pageIndex, e.pageSize).subscribe(data => this.createTable(data));
  }
}