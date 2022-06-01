import { Component, OnInit } from '@angular/core';
import { from, interval, Observable, of, Subscription} from 'rxjs';
import {CatalogueService} from './catalogue.service'
import { filter } from 'rxjs/operators';
import { PanierState } from 'shared/states/produit-state';
import { Select } from '@ngxs/store';
import { StoreService } from './store.service';
import { UserState } from 'shared/states/user-state';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Bienvenue dans le Projet de fin d\'année 2022';
  
  @Select(PanierState.countProducts) countProducts$ : Observable<number>;
  @Select(UserState.getUser) user$ : Observable<string>;

  constructor(public store : StoreService, public router : Router) {}
  
  myObservable = of('TODO')
  myObservable2 = from(['titi', 'toto', 'tutu'])
  myObservable3 = interval(2000);

  subscribe: Subscription; 
  subscribe2$ : Subscription
  valeur : number;
  
  ngOnInit(): void{
    this.subscribe = 
      this.myObservable3
      .pipe(
        filter((v) => v%2 == 0)
      )
      .subscribe((value) => this.valeur = value)
  }

  ngOnDestroy() : void{
    this.subscribe.unsubscribe()
  }

  signout(){
    this.store.logoutState();
    this.router.navigate(['/client/signin']);
  }
}
