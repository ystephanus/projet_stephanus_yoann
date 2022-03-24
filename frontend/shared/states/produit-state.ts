import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Voiture } from "shared/models/Voiture";
import { AddProduct, RemoveProduct } from "../actions/produit.action";
import { ProduitStateModel } from "./produit-state-model";

@State<ProduitStateModel>({
    name:'panier',
    defaults:{
        produits: []
    }
})

export class PanierState {
    @Selector()
    static getProduit(state: ProduitStateModel){
        return state.produits;
    }
    @Selector()
    static countProducts(state: ProduitStateModel){
        let res : number = 0
        state.produits.forEach(p => res += p.quatite);
        return res;
    }
    
    @Action(AddProduct)
    AddProduct(
        {getState, patchState}:StateContext<ProduitStateModel>, 
        {payload}: AddProduct
    ){

        const state = getState()
        if(state.produits.find(elem => elem.modele == payload.modele)){
            patchState({
                produits: state.produits.map((v : Voiture) => v.modele !== payload.modele ? v : {...v, quatite : v.quatite +1})
            })  
        }else{
            patchState({
                produits: [...state.produits, {...payload, quatite: 1}]
            })
        }
    }

    @Action(RemoveProduct)
    DeleteProduct(
        {getState, patchState}:StateContext<ProduitStateModel>,
        {payload}: RemoveProduct
    ){
        const state = getState()
        if(state.produits.find(elem => elem.modele == payload.modele).quatite > 1){
            patchState({
                produits: state.produits.map((v : Voiture) => v.modele !== payload.modele ? v : {...v, quatite : v.quatite -1})
            })
        }else{
            patchState({
                produits: state.produits.filter(produit => produit.modele !== payload.modele)
            })
        }
    }  


}


