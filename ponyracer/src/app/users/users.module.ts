import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { USERS_ROUTES } from './users.routes';
import { MoneyHistoryComponent } from './money-history/money-history.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(USERS_ROUTES),
    SharedModule,
  ],
  declarations: [
    RegisterComponent,
    LoginComponent,
    MoneyHistoryComponent,
  ]
})
export class UsersModule { }
