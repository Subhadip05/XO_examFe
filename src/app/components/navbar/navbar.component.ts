import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isLoggedIN = false;
  user = null;

  constructor(public login: LoginService) {}

  ngOnInit(): void {
    this.isLoggedIN = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe((data) => {
      this.isLoggedIN = this.login.isLoggedIn();
      this.user = this.login.getUser();
    });
  }

  public logOut() {
    this.login.logOut();
    window.location.reload();
  }
}
