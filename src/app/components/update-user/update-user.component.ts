import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import ValidateForm from '../../helpers/validateForm';
import { AuthService } from '../../services/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  updateUserForm: FormGroup;
  userId!: number;
  errorMessage!: string;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private toast: NgToastService
  ) {
    this.updateUserForm = this.fb.group({
      id: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = +params['id'];
      this.loadUser();
    });
  }

  hideShowPassword() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  loadUser(): void {
    this.http.get(`https://localhost:7207/api/User/${this.userId}`).subscribe(
      (user: any) => {
        user.password = ''; // Set the password field to an empty string
        this.updateUserForm.patchValue(user);
      },
      (error) => {
        console.error('Error loading user:', error);
        this.errorMessage = error.error.message || 'An error occurred';
      }
    );
  }

  onUpdate(): void {
    if (this.updateUserForm.valid) {
      console.log(this.updateUserForm.value);

      // Enviar objeto a la base de datos
      this.auth.updateUser(this.userId, this.updateUserForm.value).subscribe({
        next: (res) => {
          this.updateUserForm.reset();
          this.toast.success(res.message, 'SUCCESS', 5000);
          this.router.navigate(['dashboard']);
        },
        error: (err) => {
          this.toast.danger('Something went wrong!');
        },
      });
    } else {
      // Mostrar el error usando toaster y con los campos requeridos
      ValidateForm.validateAllFormFields(this.updateUserForm);
      alert('Your form is invalid');
    }
  }
}
