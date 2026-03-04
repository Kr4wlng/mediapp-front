import { Injectable } from '@angular/core';
import { Specialty } from '../models/specialty';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root',
})
export class SpecialtyService extends GenericService<Specialty>{
  
  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/specialties`)
  }

}
