import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PanierState } from 'shared/states/produit-state';
import {Voiture} from 'shared/models/Voiture'
import {StoreService} from 'src/app/store.service'

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  constructor(public storeService : StoreService){}


  ngOnInit(): void {
  }
  @Select(PanierState.getProduit) produits$ : Observable<Voiture[]>
}
