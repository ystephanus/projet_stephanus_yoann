import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddAddress, RemoveAddress } from 'shared/actions/adresse.action';
import { AddProduct, RemoveProduct } from 'shared/actions/produit.action';
import { Adresse } from 'shared/models/Adresse';
import { Voiture } from 'shared/models/Voiture';


@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private store: Store) { }

  public addToBasket(v: Voiture){
    return this.store.dispatch(new AddProduct(v));
  }

  public deleteToBasket(v: Voiture){
    return this.store.dispatch(new RemoveProduct(v));
  }

  public addAdress(a: Adresse){
    return this.store.dispatch(new AddAddress(a))
  }

  public deleteAdresse(a: Adresse){
    return this.store.dispatch(new RemoveAddress(a))
  }
}
