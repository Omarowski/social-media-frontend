import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from "../header/header.component";  // Import Router and RouterModule

import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent implements OnInit{

  form:any = {
    username:null,
    password:null
  };
  isLoggedIn = false;
  isLoginFaild = false;
  errorMessage = '';


  passwordFieldType: string = 'password';
  // username: string = ""
  // password: string = ""

  constructor(private router:Router,private authService: AuthService, private storageService: StorageService){}
  ngOnInit(): void {
    if(this.storageService.isLoggedIn()){
      this.isLoggedIn = true;
      console.log("something")
    }
  }

  onSubmit(): void{
    const {username, password} = this.form;

    this.authService.login(username,password).subscribe({
      next:data => {
        this.storageService.saveUser(data);
        this.isLoginFaild = false;
        this.isLoggedIn = true;
        this.router.navigate(['/main-page'])

      },
      error:err =>{
        this.errorMessage = err.error.message;
        this.isLoginFaild = true;
      }
    })
  }

  reloadPage():void{
    window.location.reload();
  }

  togglePass() {
    // Toggle the input type between 'password' and 'text'
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  //to be decided created in case we want to use a button instead of an <a> ref 
  goToRegister(){
    this.router.navigate(['/register'])
  }
}