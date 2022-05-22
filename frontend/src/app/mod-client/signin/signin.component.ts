import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConnexionService } from '../connexion.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private connexionService : ConnexionService) { }

  profileForm = new FormGroup({
    login : new FormControl(''),
    password : new FormControl('')
  });

  onSubmit(){
    this.connexionService.login(this.profileForm.value.login,this.profileForm.value.password).subscribe(data => console.log(data));
  }

  ngOnInit(): void {
  }

}
