import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddProduct, ClearProduct, RemoveProduct } from 'shared/actions/produit.action';
import { Login, Logout } from 'shared/actions/user.action';
import { Adresse } from 'shared/models/Adresse';
import { Voiture } from 'shared/models/Voiture';


@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private store: Store) { }

  private authenticate : boolean = false;

  public addToBasket(v: Voiture){
    return this.store.dispatch(new AddProduct(v));
  }

  public deleteToBasket(v: Voiture){
    return this.store.dispatch(new RemoveProduct(v));
  }

  public clearBasket(){
    return this.store.dispatch(new ClearProduct());
  }

  public loginState(username : string) : void{
    this.store.dispatch(new Login(username));
    this.authenticate = true;
  }

  public logoutState():void{
    this.store.dispatch(new Logout());
    this.authenticate = false;
  }

  public isLogged(){
    return this.authenticate;
  }
}
