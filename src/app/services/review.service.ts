import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private baseUrl: string = 'https://localhost:7207/api/Reviews';

  constructor(private http: HttpClient) { }

  getAllReviews(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`).pipe(
      catchError(this.handleError)
    );
  }

  getReviewById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createReview(reviewData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, reviewData).pipe(
      catchError(this.handleError)
    );
  }

  updateReview(id: number, reviewData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, reviewData).pipe(
      catchError(this.handleError)
    );
  }

  deleteReview(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      console.error('Error del lado del cliente:', error.error.message);
    } else {
      // El servidor devolvió un código de error
      console.error(
        `Código de error ${error.status}, ` +
        `Error: ${error.error}`);
    }
    // Devuelve un observable con un mensaje de error para que la aplicación pueda manejarlo
    return throwError('Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde.');
  }
}
