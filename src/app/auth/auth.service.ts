import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import * as auth0 from 'auth0-js';

import * as moment from 'moment';
import { Moment } from 'moment';

@Injectable()
export class AuthService {

  private auth0: auth0.WebAuth;

  private auth0Config = {
    clientID: '9D0LHGTPFCODuIfHUIkNdlyvZn29sAto',
    domain: 'hoopiz-demo.eu.auth0.com'
  };

  readonly serverPort = 3000;
  readonly serverUrl = `http://www.localhost:${this.serverPort}`;
  readonly serverUri = `${this.serverUrl}/api`;

  constructor(
    private httpClient: HttpClient,
    private router: Router) {
      this.auth0 = new auth0.WebAuth({
        clientID: this.auth0Config.clientID,
        domain: this.auth0Config.domain,
        responseType: 'token id_token',
        redirectUri: 'http://localhost:4200',
      });
    }

  get signedIn(): boolean {
    return moment().isBefore(this.expiresAt);
  }

  get signedOut(): boolean {
    return ! this.signedIn;
  }

  private get expiresAt(): Moment {
    const expiresAt: string = localStorage.getItem('auth0.expiresAt');
    const result: number = JSON.parse(expiresAt);
    return moment(result);
  }

  get email(): string {
    const result: string = localStorage.getItem('auth0.email');
    return result;
  }

  get name(): string {
    const result: string = localStorage.getItem('auth0.name');
    return result;
  }

  signIn() {
    this.auth0.authorize({prompt: 'login'});
  }

  signUp() {
  }

  signOut() {
    this.removeToken();
    this.router.navigate(['/']);
  }

  getAuth() {
    this.auth0.parseHash((error: auth0.Auth0ParseHashError, result: auth0.Auth0DecodedHash) => {
      if (error) {
        console.error('Authentication failed:', error);
      } else if (result?.idToken) {
        console.log('Authentication successful:', result);
        window.location.hash = '';
        this.storeToken(result);
      }
    });
  }

  private storeToken(hash: auth0.Auth0DecodedHash) {
    const expiresAt: Moment = moment().add(hash.expiresIn, 'second');
    localStorage.setItem('auth0.idToken', hash.idToken);
    localStorage.setItem('auth0.expiresAt', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('auth0.email', hash.idTokenPayload?.email);
    localStorage.setItem('auth0.name', hash.idTokenPayload.name);
  }

  private removeToken() {
    localStorage.removeItem('auth0.idToken');
    localStorage.removeItem('auth0.expiresAt');
    localStorage.removeItem('auth0.email');
    localStorage.removeItem('auth0.name');
  }

  getData(): Observable<any> {
    return this.httpClient.get<any>(`${this.serverUri}/data`);
  }

  getAuthorizedData(): Observable<any> {
    return this.httpClient.get<any>(`${this.serverUri}/authorized-data`);
  }
}
