import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Specialty } from '../../models/specialty';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SpecialtyService } from '../../services/specialty.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-specialty',
  imports: [MaterialModule, RouterLink, RouterOutlet],
  templateUrl: './specialty.component.html',
  styleUrl: './specialty.component.css',
})
export class SpecialtyComponent {

  dataSource: MatTableDataSource<Specialty>;
  columnsDefinitions = [
    { def: 'idSpecialty', label: 'idSpecialty', hide: true },
    { def: 'nameSpecialty', label: 'name', hide: false },
    { def: 'descriptionSpecialty', label: 'description', hide: false },
    { def: 'actions', label: 'actions', hide: false }
  ]

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private specialtyService: SpecialtyService,
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void{
    this.specialtyService.findAll().subscribe(data => this.createTable(data));
  }

  getDisplayedColumns(): string[] {
    return this.columnsDefinitions.filter(cd => !cd.hide).map(cd => cd.def);
  }

  applyFilter(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }

  createTable(data: Specialty[]){
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  }

  delete(idSpecialty: number){
    this.specialtyService.delete(idSpecialty)
    .pipe(switchMap( () => this.specialtyService.findAll()))
    .subscribe(data => {
      this.specialtyService.setSpecialtyChange(data);
      this.specialtyService.setMessageChange('DELETED!');
    });
  }

  checkChildren(){
    return this.route.children.length > 0;
  }

}
