import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PointsService {

  constructor(private http: HttpClient) {}

  private getBalance = 'http://localhost:3200/getBalanceAll';
  private transfer = 'http://localhost:3200/transfer';

  public getPoints(){
    return this.http.get(`${this.getBalance}`).pipe(retry(3), catchError(this.handleError));
  }

  public patchPoints(id: number, value: number){
    return this.http.post(`${this.transfer}/${id}/${value}`, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    }).pipe(retry(3), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
