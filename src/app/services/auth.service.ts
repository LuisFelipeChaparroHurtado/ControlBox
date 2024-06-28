import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'https://localhost:7207/api/User';
  private userPayload: any;
  loggedInUserId!: number | null;

  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodeToken();
  }

  signUp(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}/register`, userObj);
  }

  login(loginObj: any) {
    return this.http.post<any>(`${this.baseUrl}/authenticate`, loginObj);
  }

  getAllUsers() {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getUserById(id: number) {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  updateUser(id: number, userObj: any) {
    return this.http.put<any>(`${this.baseUrl}/${id}`, userObj);
  }

  deleteUser(id: number) {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
  
  signOut(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue);
    this.userPayload = this.decodeToken(); // Update userPayload after storing token
  }

  getToken(){
    return localStorage.getItem('token') || '';
  }

  isLoggetIn(): boolean {
    return !!this.getToken();
  }

  decodeToken() {
    const token = this.getToken();
    const jwtHelper = new JwtHelperService();

    if (token) {
      try {
        return jwtHelper.decodeToken(token);
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }

  getRoleIdFromToken(): string {
    return this.userPayload?.role || ''; // Ajusta según el nombre del claim utilizado en el backend
  }  

  getFullNameFromToken(): string {
    return this.userPayload?.unique_name || ''; // Return empty string if undefined
  }

  getLoggedInUserId(): number | null {
    return this.loggedInUserId;
  }

}
