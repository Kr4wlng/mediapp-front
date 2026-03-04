import { Injectable } from '@angular/core';
import { Specialty } from '../models/specialty';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpecialtyService extends GenericService<Specialty>{

  private patientChange: Subject<Specialty[]> = new Subject<Specialty[]>;
  private messageChange: Subject<string> = new Subject<string>;
  
  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/specialties`)
  }

  //////////////////////////

  setSpecialtyChange(data: Specialty[]){
      this.patientChange.next(data);
    }
  
    getSpecialtyChange(){
      return this.patientChange.asObservable();
    }
  
    setMessageChange(data: string){
      this.messageChange.next(data);
    }
  
    getMessageChange(){
      return this.messageChange.asObservable();
    }

}
