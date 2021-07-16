import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Auth0 Tester';

  data: any = null;
  error = false;

  constructor(
    private authService: AuthService) {
  }

  get serverUrl(): string {
    return this.authService.serverUrl;
  }

  get signedIn(): boolean {
    return this.authService.signedIn;
  }

  get signedOut(): boolean {
    return this.authService.signedOut;
  }

  get email(): string {
    return this.authService.email;
  }

  get dataColor(): any {
    const color = (this.error) ? 'red' : 'green';
    return {color};
  }

  ngOnInit(): void {
    this.authService.getAuth();
  }

  signIn() {
    this.authService.signIn();
  }

  signUp() {
    this.authService.signUp();
  }

  signOut() {
    this.data = null;
    this.error = false;
    this.authService.signOut();
  }

  getEmail(): string {
    return (this.signedIn) ? this.authService.email : null;
  }

  getName(): string {
    return (this.signedIn && this.authService.name !== this.authService.email) ? this.authService.name : null;
  }

  getData() {
    this.authService.getData().subscribe((response: any) => {
      this.data = response?.data;
      this.error = false;
    }, (errorResponse) => {
      this.data = errorResponse?.error?.message;
      this.error = true;
    });
  }

  getAuthorizedData() {
    this.authService.getAuthorizedData().subscribe((response: any) => {
      this.data = response?.data;
      this.error = false;
    }, (errorResponse) => {
      this.data = errorResponse?.error?.message;
      this.error = true;
    });
  }
}
