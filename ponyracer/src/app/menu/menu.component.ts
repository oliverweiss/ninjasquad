import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { UserModel } from '../models/user.model';
import { UserService } from '../user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'pr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  public userEventsSubscription: Subscription;
  public user: UserModel;

  public navbarCollapsed = true;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userEventsSubscription = this.userService.userEvents
    .switchMap(user => user ?
      Observable.of(user)
        .concat(this.userService.scoreUpdates(user.id))
        .catch(err => Observable.empty())
      : Observable.of(null))
    .subscribe(user => this.user = user);
  }

  ngOnDestroy() {
    if (this.userEventsSubscription) {
      this.userEventsSubscription.unsubscribe();
    }
  }

  toggleNavbar() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }

  logout(event: Event) {
    event.preventDefault();
    this.userService.logout();
    this.router.navigate(['/']);
  }

}
