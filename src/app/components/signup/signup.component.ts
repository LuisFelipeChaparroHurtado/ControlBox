import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../../helpers/validateForm';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router,  private toast: NgToastService) {}
  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      username : ['', Validators.required],
      email : ['', Validators.required],
      password : ['', Validators.required]
    })
  }
  hideShowPassword() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }



  onSignUp() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
  
      // Enviar objeto a la base de datos
      this.auth.signUp(this.signUpForm.value).subscribe({
        next: (res) => {
          this.signUpForm.reset();
          this.toast.success(res.message, "SUCCESS", 5000)
          this.router.navigate(['login']);
        },
        error: (err) => {
          this.toast.danger("Something went wrong!")
        }
      });
    } else {
      // Mostrar el error usando toaster y con los campos requeridos
      ValidateForm.validateAllFormFields(this.signUpForm);
      alert('Your form is invalid');
    }
  }
  
   
}
