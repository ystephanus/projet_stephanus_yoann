import { Injectable } from "@angular/core";
import { Action, Select, Selector, State, StateContext } from "@ngxs/store";
import { Login, Logout } from "shared/actions/user.action";

interface UserStateModel{
    username : string;
}


@State<UserStateModel>({
    name : 'user',
    defaults : {
        username : ""
    }
})

@Injectable()
export class UserState{

   @Selector()
   static getUser(state : UserStateModel){
       return state.username;
   }

    @Action(Login)
    login( ctx: StateContext<UserStateModel>, username: string){
        const state = ctx.getState();
        console.log(username)
        ctx.patchState({
            username : username
        })
    }

    @Action(Logout)
    logout(ctx: StateContext<UserStateModel>){
        const state = ctx.getState();
        ctx.patchState({
            username : ""
        })
    }

}