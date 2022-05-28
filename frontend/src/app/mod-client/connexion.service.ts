import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Login } from 'shared/actions/user.action';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  constructor(private http : HttpClient, private state : Store) { }

  public login(data: any) : Observable<any>{
    return this.http.post<any>('/api/login', data);
    }

  public signin(data : any){
    return this.http.post('/api/signup', data);
  }
}
