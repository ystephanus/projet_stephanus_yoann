import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Select, Selector } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { UserState } from 'shared/states/user-state';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  
  @Select(UserState.getUser) user$ : Observable<string>; 
  constructor(private storeService : StoreService){}
  
  canActivate() : boolean{
    let res : boolean = false;
    this.user$.subscribe(data => res = data ? true : false);
    return res;
  }
  
}
