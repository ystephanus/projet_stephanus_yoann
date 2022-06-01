import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { HomeComponent } from './home/home.component';
import { NgxsModule } from '@ngxs/store';
import { PanierState } from 'shared/states/produit-state';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon'
import { MatSliderModule } from '@angular/material/slider';
import { UserFormComponent } from './user-form/user-form.component';
import { UserRecapComponent } from './user-recap/user-recap.component';
import {ApiHTTPInterceptor} from './api-httpinterceptor';
import { UserState } from 'shared/states/user-state';
import { Error404Component } from './error404/error404.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

const routes : Routes=[
  { path: 'catalogue', component: CatalogueComponent , canActivate : [AuthGuardGuard]},
  { path: 'panier', loadChildren: () => import('./mod-panier/mod-panier.module').then(m => m.ModPanierModule) , canActivate: [AuthGuardGuard]},
  { path: 'client', loadChildren: () => import('./mod-client/mod-client.module'). then(m => m.ClientModule)},
  { path: 'catalogue/:id', component: DetailProductComponent, canActivate: [AuthGuardGuard]},
  { path: 'home', component: HomeComponent },
  { path: 'login', component: UserFormComponent },
  { path: '', redirectTo: '/client/signin', pathMatch: 'full' },
  { path: '**', component: Error404Component, pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    DetailProductComponent,
    CatalogueComponent,
    UserFormComponent,
    UserRecapComponent,
    Error404Component,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    NgxsModule.forRoot([PanierState, UserState]),
    BrowserAnimationsModule,
    MatIconModule,
    MatSliderModule,
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass: ApiHTTPInterceptor, multi: true},
    AuthGuardGuard,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
