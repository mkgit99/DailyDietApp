import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { User } from 'src/app/data/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private url = 'Auth';
    isLoggedIn = false;

    constructor(private http: HttpClient) {}

    public register(user: User): Observable<any> {
        return this.http.post<any>(`${environment.apiURL}/${this.url}/register`, user);
    }

    public login(user: User): Observable<string> {
        return this.http.post(`${environment.apiURL}/${this.url}/login`, user, {
            responseType: 'text',
        });
    }

    public getLoggedUser(): Observable<string> {
        return this.http.get(`${environment.apiURL}/${this.url}`, {
            responseType: 'text',
        });
    }

	public isAuthenticated(): boolean {
        return this.isLoggedIn;
    }
}
