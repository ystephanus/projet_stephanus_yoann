import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  constructor(private http : HttpClient) { }

  public login(login: String, password: String) : Observable<any>{
    let data: String = "";

    let httpOptions = {
      headers : new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
    };
    data = 'login='+login+"&pass="+password;
    return this.http.post<any>('/api/login', data, httpOptions);
    }
}
