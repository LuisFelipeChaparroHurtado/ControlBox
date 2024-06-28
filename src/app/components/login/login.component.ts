import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import ValidateForm from '../../helpers/validateForm';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private toast: NgToastService, private userStore: UserStoreService) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  hideShowPassword() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }
  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);

      //Send obj to database

      this.auth.login(this.loginForm.value).subscribe({
        next:(res)=>{
          this.loginForm.reset();
          this.auth.storeToken(res.token);
          let tokenPayload = this.auth.decodeToken();
          this.userStore.setFullNameForStore(tokenPayload.unique_name);
          this.userStore.setRoleForStore(tokenPayload.role);
          this.toast.success(res.message, "SUCCESS", 5000);
          this.router.navigate(['dashboard']);
        },
        error:(err)=>{
          this.toast.danger("Something went wrong!")
        }
      })
    } else {
      //thorw the error using toaster and with required fields
      ValidateForm.validateAllFormFields(this.loginForm);
      alert("Your form ius valid");
    }
  }
  
}
