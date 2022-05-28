import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  constructor(private http : HttpClient) { }

  public login(data: any) : Observable<any>{
    return this.http.post<any>('/api/login', data);
    }

  public signin(data : any){
    return this.http.post('/api/signup', data);
  }
}
