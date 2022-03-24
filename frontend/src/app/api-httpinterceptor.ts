import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";

@Injectable()
export class ApiHTTPInterceptor implements HttpInterceptor{
    jwtToken : String = "";

    constructor(){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if(this.jwtToken != ""){
            req = req.clone({setHeaders : {Authorization: `Authorization ${this.jwtToken}`}});
        }
        return next.handle(req).pipe(tap(
            (evt : HttpEvent<any>) =>{
                if (evt instanceof HttpResponse){
                    let tab : Array<String>;
                    let enteteAuthorization = evt.headers.get("Authorization");
                    if(enteteAuthorization != null){
                        tab = enteteAuthorization.split(/Bearer\s+(.*)$/i);
                        if(tab.length > 1){
                            this.jwtToken = tab[1]
                        }
                    }
                }
            }
        ))
    }
}
