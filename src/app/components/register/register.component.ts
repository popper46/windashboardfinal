import { Component, OnInit } from '@angular/core';
import {RegisterService} from '../../services/register.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private registerService: RegisterService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void{
    this.registerService.SignIn(this.loginForm.controls.username.value, this.loginForm.controls.password.value);
  }

  register(): void{
   this.registerService.SignUp( this.loginForm.controls.username.value, this.loginForm.controls.password.value);
  }

}
