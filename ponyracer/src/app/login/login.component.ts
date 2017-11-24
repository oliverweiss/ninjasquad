import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { CredentialsModel } from '../models/credentials.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials: CredentialsModel = { login: '', password: '' };

  authenticationFailed= false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  authenticate() {
    this.userService.authenticate(this.credentials)
      .subscribe(
        user => this.router.navigate(['/']),
        _ => { this.authenticationFailed = true; }
      );
  }
}
