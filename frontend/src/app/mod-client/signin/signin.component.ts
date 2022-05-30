import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoreService } from 'src/app/store.service';
import { ConnexionService } from '../connexion.service';
import jsSHA from 'jssha';

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
    
    let formData = {...this.profileForm.value}
    
    let shaObj = new jsSHA("SHA-256", "TEXT");
    shaObj.update(this.profileForm.value.password);
    const passwordHash = shaObj.getHash("HEX");
    formData = {...formData, password : passwordHash}
    console.log(passwordHash);


    this.connexionService.login(formData).subscribe(data => {
      this._snackBar.open("Connexion réussi", "", {duration : 5000})
      this.storeService.loginState(this.profileForm.value.login)
    });
  }

  ngOnInit(): void {
  }

}
