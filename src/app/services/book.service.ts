import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl: string = 'https://localhost:7207/api/Book';

  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getBookById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  updateBook(id: number, userObj: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, userObj);
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
