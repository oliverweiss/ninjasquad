import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'pr-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loginCtrl: FormControl;
  passwordCtrl: FormControl;
  confirmPasswordCtrl: FormControl;
  passwordForm: FormGroup;
  birthYearCtrl: FormControl;

  userForm: FormGroup;

  registrationFailed = false;

  static passwordMatch(passwordGroup: FormGroup): null | {matchingError: true} {
    const password = passwordGroup.get('password').value;
    const confirm = passwordGroup.get('confirmPassword').value;
    return password === confirm ? null : { matchingError: true };
  }

  static validYear(yearControl: FormControl): null | {invalidYear: true} {
    const year = +yearControl.value;
    return year >= 1900 && year <= new Date().getFullYear() ? null : {invalidYear: true};
  }

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.loginCtrl = this.formBuilder.control('', [Validators.required, Validators.minLength(3)]);

    this.passwordCtrl = this.formBuilder.control('', [Validators.required]);
    this.confirmPasswordCtrl = this.formBuilder.control('', [Validators.required]);
    this.passwordForm = this.formBuilder.group({
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl
    }, {validator: RegisterComponent.passwordMatch});

    this.birthYearCtrl = this.formBuilder.control('', [Validators.required, RegisterComponent.validYear]);

    this.userForm = this.formBuilder.group({
      login: this.loginCtrl,
      passwordForm: this.passwordForm,
      birthYear: this.birthYearCtrl,
    });
  }

  register() {
    const login = this.loginCtrl.value;
    const password = this.passwordCtrl.value;
    const birthYear = this.birthYearCtrl.value;

    this.userService.register(login, password, birthYear)
      .subscribe(
        _ => this.router.navigate(['/']),
        _ => this.registrationFailed = true);
  }
}
