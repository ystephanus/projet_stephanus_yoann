"use strict";(self.webpackChunktp3=self.webpackChunktp3||[]).push([[0],{7e3:(v,p,i)=>{i.r(p),i.d(p,{ClientModule:()=>C});var u=i(6019),n=i(2383);let a=(()=>{class o{constructor(){}ngOnInit(){}}return o.\u0275fac=function(t){return new(t||o)},o.\u0275cmp=n.Xpm({type:o,selectors:[["app-signup"]],decls:2,vars:0,template:function(t,s){1&t&&(n.TgZ(0,"p"),n._uU(1,"signup works!"),n.qZA())},styles:[""]}),o})();var e=i(9133),m=i(4522);let c=(()=>{class o{constructor(t){this.http=t}login(t,s){let l="",h={headers:new m.WM({"Content-Type":"application/x-www-form-urlencoded"})};return l="login="+t+"&pass="+s,this.http.post("/api/login",l,h)}}return o.\u0275fac=function(t){return new(t||o)(n.LFG(m.eN))},o.\u0275prov=n.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})(),f=(()=>{class o{constructor(t){this.connexionService=t,this.profileForm=new e.cw({login:new e.NI(""),password:new e.NI("")})}onSubmit(){console.log(this.profileForm.value),this.connexionService.login(this.profileForm.value.login,this.profileForm.value.password).subscribe(t=>console.log(t))}ngOnInit(){}}return o.\u0275fac=function(t){return new(t||o)(n.Y36(c))},o.\u0275cmp=n.Xpm({type:o,selectors:[["app-signin"]],decls:11,vars:1,consts:[[3,"formGroup","ngSubmit"],[1,"form-group","mb-3"],["for","exampleInputEmail1"],["type","email","placeholder","Enter email","formControlName","login",1,"form-control"],["for","exampleInputPassword1"],["type","password","placeholder","Password","formControlName","password",1,"form-control"],["type","submit",1,"btn","btn-primary"]],template:function(t,s){1&t&&(n.TgZ(0,"form",0),n.NdJ("ngSubmit",function(){return s.onSubmit()}),n.TgZ(1,"div",1),n.TgZ(2,"label",2),n._uU(3,"Email address"),n.qZA(),n._UZ(4,"input",3),n.qZA(),n.TgZ(5,"div",1),n.TgZ(6,"label",4),n._uU(7,"Password"),n.qZA(),n._UZ(8,"input",5),n.qZA(),n.TgZ(9,"button",6),n._uU(10,"Connexion"),n.qZA(),n.qZA()),2&t&&n.Q6J("formGroup",s.profileForm)},directives:[e._Y,e.JL,e.sg,e.Fj,e.JJ,e.u],styles:[""]}),o})();var g=i(1247);const d=[{path:"signin",component:f},{path:"signup",component:a}];let C=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=n.oAB({type:o}),o.\u0275inj=n.cJS({imports:[[u.ez,g.Bz.forChild(d),e.UX]]}),o})()}}]);