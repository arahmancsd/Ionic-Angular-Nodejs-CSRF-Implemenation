import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthServices {
    constructor(private http: HttpClient) { }
    ValidateReference(login: any): Observable<any> {
        const route = `/api/validate`;
        return this.http.post<any>(route, login, this.GetHttpHeader());
        // .pipe(catchError(this.handleError));
    }
    GetHttpHeader() {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json'
        })};
        return httpOptions;
    }
}
