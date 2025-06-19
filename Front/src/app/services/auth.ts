import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserI } from '../models/user';
import { JwtResponseI } from '../models/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class Auth {
  AUTH_SERVER: string = 'http://localhost:3000/api';
  authSubject = new BehaviorSubject(false);
  private token: string | undefined;
  constructor(private httpClient: HttpClient) {}

  register(user: UserI): Observable<JwtResponseI> {
    return this.httpClient
      .post<JwtResponseI>(`${this.AUTH_SERVER}/register`, user)
      .pipe(
        tap((response: JwtResponseI) => {
          if (response && response.dataUser) {
            this.saveToken(
              response.dataUser.accessToken,
              response.dataUser.expiresIn
            );
          }
        })
      );
  }

  login(user: UserI): Observable<JwtResponseI> {
    return this.httpClient
      .post<JwtResponseI>(`${this.AUTH_SERVER}/login`, user)
      .pipe(
        tap((response: JwtResponseI) => {
          if (response && response.dataUser) {
            this.saveToken(
              response.dataUser.accessToken,
              response.dataUser.expiresIn
            );
          } else {
            console.warn('Repsuesta invalida');
          }
        })
      );
  }

  logout(): void {
    this.token = '';
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('EXPIRES_IN');
  }

  private saveToken(token: string, expiresIn: string): void {
    localStorage.setItem('ACCESS_TOKEN', token);
    localStorage.setItem('EXPIRES_IN', expiresIn);
    this.token = token;
  }

  private getToken(): string | undefined {
    if (!this.token) {
      this.token = localStorage.getItem('ACCESS_TOKEN') ?? undefined;
    }
    return this.token;
  }
}
