import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirstService {
  private url = "https://jsonplaceholder.typicode.com/posts"; // URL de la nueva API

  constructor(private http: HttpClient) { }

  getObjects(): Observable<any> {
    return this.http.get(this.url).pipe(
      catchError(this.handleError)
    );
  }

  createObject(object: any): Observable<any> {
    return this.http.post(this.url, object).pipe(
      catchError(this.handleError)
    );
  }

  deleteObject(id: number): Observable<any> {
    const deleteUrl = `${this.url}/${id}`;
    return this.http.delete(deleteUrl).pipe(
      catchError(this.handleError)
    );
  }

  updateObject(object: any): Observable<any> {
    const updateUrl = `${this.url}/${object.id}`;
    return this.http.put(updateUrl, object).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Ocurrió un error:', error);
    return throwError('Error en la solicitud HTTP. Por favor, intenta nuevamente.');
  }
}
