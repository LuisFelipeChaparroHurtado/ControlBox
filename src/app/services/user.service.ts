import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string = 'https://localhost:7207/api/User';
  private userPayload: any;

  constructor(private http: HttpClient, private router: Router) {}

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
}
