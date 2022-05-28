import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {ConnexionService} from '../connexion.service' 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private fb : FormBuilder, private _snackBar: MatSnackBar, private connexionService : ConnexionService) { }

  ngOnInit(): void {
  }

  profileForm = this.fb.group({
    nom : ['', Validators.required],
    prenom : ['', Validators.required],
    civilite : ['', Validators.required],
    adresse : ['', Validators.required],
    codepostal : ['', Validators.required],
    ville : ['', Validators.required],
    pays : ['', Validators.required],
    telephone : ['', Validators.required],
    mail : ['', Validators.required],
    username : ['', Validators.required],
    password : ['', Validators.required]
  })

  formSubmit(){
    console.log("valide")
    
    this.connexionService.signin(this.profileForm.value).subscribe(data => 
      this._snackBar.open("Creation de compte réussi, Vous pouvez vous connectez", "",{
      duration : 10000,
    }))
  }
  

}
