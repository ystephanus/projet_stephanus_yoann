import { Action, Selector, State, StateContext} from "@ngxs/store";
import { AddAddress, RemoveAddress } from "shared/actions/adresse.action";
import { AdresseStateModel } from "./adresse-state-model";


@State<AdresseStateModel>({
    name: 'adresse',
    defaults:{
        adresses : []
    }
})

export class AdresseState{
    @Selector()
    static getAdresses(state: AdresseStateModel){
        return state.adresses;
    }
    @Selector()
    static countAdress(state: AdresseStateModel){
        return state.adresses.length;
    }

    @Action(AddAddress)
    AddProduct(
        {getState, patchState}:StateContext<AdresseStateModel>, 
        {payload}: AddAddress
    ){

        const state = getState()
        patchState({
            adresses: [...state.adresses, payload]
        })
    }

    @Action(RemoveAddress)
    DeleteProduct(
        {getState, patchState}:StateContext<AdresseStateModel>,
        {payload}: RemoveAddress
    ){
        const state = getState()
        patchState({
            adresses: state.adresses.filter(address => address != payload)
        })
    } 
}