import {Adresse} from '../models/Adresse'

export class AddAddress{
    static readonly type = 'add address'
    constructor(public payload: Adresse){}
}

export class RemoveAddress{
    static readonly type = 'remove address'
    constructor(public payload: Adresse){}
}