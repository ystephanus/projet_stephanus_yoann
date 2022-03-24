import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router'
import { Select, Selector, Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { Voiture } from 'shared/models/Voiture';
import { PanierState } from 'shared/states/produit-state';
import { CatalogueService } from '../catalogue.service';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {

  id : number;
  constructor(private route: ActivatedRoute, private catalogueService : CatalogueService, public storeService: StoreService) { }
  voitureDetail$ : Observable<Voiture[]>


  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap)=>{
      this.id = +params.get('id');
      this.voitureDetail$ = this.catalogueService.getCatalogue()
                            .pipe(
                              map(voitures => voitures.filter((v, idx)=> idx == this.id)
                            ))
    })
  }
}
