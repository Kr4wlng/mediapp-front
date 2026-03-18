import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-mat-table',
  imports: [ MaterialModule ],
  templateUrl: './mat-table.component.html',
  styleUrl: './mat-table.component.css',
})
export class MatTableComponent implements OnInit{

  @Input() columns: any[] = [];
  @Input() data: any[] = [];
  @Input() pagesSizeOptions: number[] = [5, 10, 25];

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.displayedColumns = this.columns.map(col => col.def);
    this.dataSource = new MatTableDataSource(this.data);
  }

  // Se ejecuta varias veces, cada vez que una propiedad de entrada cambia
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']) {
      // Actualiza el datasource cuando los datos cambian
      this.dataSource = new MatTableDataSource(this.data);
      if(this.paginator){
        this.dataSource.paginator = this.paginator;
      }
      if(this.sort) {
        this.dataSource.sort = this.sort;
      }
    }
  }

  // Solo se ejecuta una vez, después de que toda la vista y los hijos del componente han sido inicializados
  ngAfterViewInit(){
    if(this.paginator){
      this.dataSource.paginator = this.paginator;
    }
    if(this.sort){
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
