import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Voiture } from 'shared/models/Voiture';

@Injectable({
  providedIn: 'root'
})

export class CatalogueService {

  constructor(private httpClient: HttpClient) {}

  public postClient(){
      return "create client"
  }

  public getClient(){
    return "get client"
  }

  public postLogin(){
    return "login a user"
  }
  public getCatalogue() : Observable<Voiture[]>{
    
    return this.httpClient
      .get<Voiture[]>(environment.baseUrl)  
  }

}
