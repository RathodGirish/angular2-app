import { Injectable, Component } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { CoolLocalStorage } from 'angular2-cool-storage';
import { User } from '../models/user';

@Injectable()
export class AuthComponent implements CanActivate {

    //constructor(public router: Router) { }

    public currentUser: User;

    localStorage: CoolLocalStorage;

    constructor(public router: Router,
        localStorage: CoolLocalStorage) {
        //this.cookieService = cookieService;  
        this.localStorage = localStorage;  
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.currentUser = this.localStorage.getObject('currentUser');
        if (this.currentUser) {
            // logged in so return true
            return true;
        } else {
            //this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
            return false;
        }
    }
}