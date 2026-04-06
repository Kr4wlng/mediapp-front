import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../material/material.module';
import { filter, switchMap } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { RouterOutlet, RouterLink } from '@angular/router';
import { RouterLinkWithHref } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuService } from '../../services/menu.service';
import { Menu } from '../../models/menu';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [MaterialModule, RouterOutlet, RouterLink],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css',
})
export class PatientComponent implements OnInit{

  patients: Patient[] = [];
  menus: Menu[];
  dataSource: MatTableDataSource<Patient>;
  // displayedColumns: string[] = ['idPatient', 'firstName', 'lastName', 'dni'];
  columnsDefinitions = [
    { def: 'idPatient', label: 'idPatient', hide: true },
    { def: 'firstName', label: 'firstName', hide: false },
    { def: 'lastName', label: 'lastName', hide: false },
    { def: 'dni', label: 'dni', hide: false },
    { def: 'actions', label: 'actions', hide: false }
  ]

  constructor(
    private patientService: PatientService,
    private menuService: MenuService,
    private _snackBar: MatSnackBar
  ){}

  // Con el @ViewChild() capturamos las directivas de Angular material, es decir que lo traemos acá
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  totalElements: number = 0;

  // ngOnInit => Método que traerá la data apenas se levante el componente de pacientes
  ngOnInit(): void{
    // this.patientService.findAll().subscribe(data => this.createTable(data));

    this.patientService.listPageable(0, 2).subscribe(data => this.createTable(data));

    this.patientService.getPatientChange().subscribe(data => this.createTable(data));
    this.patientService.getMessageChange().subscribe(data => {
      this._snackBar.open(data, 'INFO', {duration: 2000, verticalPosition: 'top', horizontalPosition: 'right'})
    });
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

  // getDisplayedColumns => Método que mostrará las columnas que tendrá la tabla
  getDisplayedColumns() {
    return this.columnsDefinitions.filter(cd => !cd.hide).map(cd => cd.def);
  }

  // applyFilter => Método que aplicará el filtrado de búsqueda de la tabla pacientes
  applyFilter(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }

  delete(idPatient: number){
    this.patientService.delete(idPatient)
    .pipe(switchMap( () => this.patientService.findAll()))
    .subscribe(data => {
      this.patientService.setPatientChange(data);
      this.patientService.setMessageChange('DELETED!');
    });
  }

  showMore(e: any){
    this.patientService.listPageable(e.pageIndex, e.pageSize).subscribe(data => this.createTable(data));
  }

}
