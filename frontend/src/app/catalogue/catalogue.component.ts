import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Voiture } from 'shared/models/Voiture';
import {CatalogueService} from 'src/app/catalogue.service'
import { map } from 'rxjs';
import { StoreService } from '../store.service';


@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  catalogue$ : Observable<Voiture[]>;
  recherche : string;


  constructor(private catalogueService : CatalogueService, public storeService : StoreService) { }

  ngOnInit(): void {
    this.catalogue$ = this.catalogueService.getCatalogue(); //init
  }

  valuechange(){
    this.catalogue$ = this.catalogueService.getProduitFiltre(this.recherche);
  }
}
