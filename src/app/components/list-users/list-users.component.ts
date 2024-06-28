import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { AuthService } from '../../services/auth.service';
import { UserStoreService } from '../../services/user-store.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent implements OnInit {
  public users: any[] = [];
  public role: string = '';
  public fullName: string = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllBooks();
    this.role = this.authService.getRoleIdFromToken();
  }

  getAllBooks() {
    this.userService.getAllUsers().subscribe(
      (data: any) => {
        if (data && data.$values) {
          this.users = data.$values;
        } else {
          console.error('Unexpected data format:', data);
        }
      },
      (error) => {
        console.error('Error fetching books: ', error);
      }
    );
  }


  deleteUser(userId: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.userService.deleteUser(userId).subscribe(
        (res) => {
          this.users = this.users.filter((user) => user.id !== userId);
          console.log('Usuario eliminado con éxito:', res);
        },
        (error) => {
          console.error('Error al eliminar usuario:', error);
          // Manejo de errores aquí
        }
      );
    }
  }

  editUser(user: any) {
    // Redirigir a la ruta específica para editar usuarios
    this.router.navigate(['/updateUser', user.id]);
  }
  logout() {
    this.authService.signOut();
  }
}