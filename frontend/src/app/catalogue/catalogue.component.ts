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

  catalogue : Observable<Voiture[]>;
  recherche : string;


  constructor(private catalogueService : CatalogueService, public storeService : StoreService) { }

  ngOnInit(): void {
    this.catalogue = this.catalogueService.getCatalogue();
  }

  valuechange(event: any){
    if(Number(this.recherche)){
      this.catalogue = this.catalogueService.getCatalogue()
      .pipe(
        map(
          voitures => 
              voitures.filter(
                v => v.prix > Number(this.recherche))
        ))
    }else{
      this.catalogue = this.catalogueService.getCatalogue()
      .pipe(
        map(
          voitures => 
              voitures.filter(
                v => v.marque.startsWith(this.recherche))
        ))
    }
  }
}
