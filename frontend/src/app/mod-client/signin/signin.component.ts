import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoreService } from 'src/app/store.service';
import { ConnexionService } from '../connexion.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private connexionService : ConnexionService, private _snackBar: MatSnackBar, private storeService : StoreService) { }

  profileForm = new FormGroup({
    login : new FormControl('', [Validators.required]),
    password : new FormControl('', Validators.required)
  });

  onSubmit(){
    this.connexionService.login(this.profileForm.value).subscribe(data => {
      this._snackBar.open("Connexion réussi", "", {duration : 5000})
      this.storeService.loginState(this.profileForm.value.login)
    });
  }

  ngOnInit(): void {
  }

}
