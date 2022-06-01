import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Login } from 'shared/actions/user.action';
import { environment } from 'src/environments/environment';
import { StoreService } from '../store.service';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  constructor(private http : HttpClient, private storeService : StoreService) { }

  public login(data: any) : Observable<any>{
    return this.http.post<any>(`${environment.ApiBaseApiUrl}/login`, data);
    }

  public signin(data : any) : Observable<any>{
    return this.http.post(`${environment.ApiBaseApiUrl}/signup`, data)
  }
}
