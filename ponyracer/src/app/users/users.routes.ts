import { MoneyHistoryComponent } from './money-history/money-history.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

export const USERS_ROUTES = [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'money',
        children: [
            {path: '', pathMatch: 'full', redirectTo: 'history'},
            {path: 'history', component: MoneyHistoryComponent},
        ]}
];
