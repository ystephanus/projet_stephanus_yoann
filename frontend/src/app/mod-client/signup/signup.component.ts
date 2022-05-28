import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private fb : FormBuilder) { }

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

}
