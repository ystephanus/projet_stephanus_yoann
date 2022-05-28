import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { Routes, RouterModule } from '@angular/router';
import { GardtestGuard } from './gardtest.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorsDirective } from '../errors.directive';
import {MatSnackBarModule} from '@angular/material/snack-bar';

const routes : Routes = [
  {path: 'signin', component: SigninComponent, /*canActivate: [GardtestGuard]*/},
  {path: 'signup', component: SignupComponent}
]

@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent,
    ErrorsDirective
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatSnackBarModule
  ]
})
export class ClientModule { }
