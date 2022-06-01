import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {ConnexionService} from '../connexion.service';
import jsSHA from "jssha";
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private fb : FormBuilder, 
    private _snackBar: MatSnackBar, 
    private connexionService : ConnexionService,
    private router : Router) { }

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

        let formData = {...this.profileForm.value}
    
    let shaObj = new jsSHA("SHA-256", "TEXT");
    shaObj.update(this.profileForm.value.password);
    const passwordHash = shaObj.getHash("HEX");
    formData = {...formData, password : passwordHash}
    console.log(passwordHash);
    
    this.connexionService.signin(formData).subscribe(() => 
      this._snackBar.open("Creation de compte réussi", "Connexion",{
      duration : 10000,
    }).onAction().subscribe(()=>{
      this.router.navigate(['/client/signin'])
    })
    )
  }
  

}
