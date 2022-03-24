import { Voiture } from "../models/Voiture";

export class AddProduct{
    static readonly type='add product';
    constructor(public payload:Voiture){}
}

export class RemoveProduct{
    static readonly type='remove product';
    constructor(public payload:Voiture){}
}