import { Subscription } from 'rxjs/Subscription';
import { UserModel } from '../models/user.model';
import { UserService } from '../user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'pr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  public userEventsSubscription: Subscription;
  public user: UserModel;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userEventsSubscription = this.userService.userEvents.subscribe(user => this.user = user);
  }

  ngOnDestroy() {
    if (this.userEventsSubscription) {
      this.userEventsSubscription.unsubscribe();
    }
  }

}
