import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Medic } from '../models/medic';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MedicService extends GenericService<Medic>{
  
  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/medics`)
  }

}
