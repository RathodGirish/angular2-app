import { Component, Injectable, NgModule, Inject } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions, RequestMethod, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { GlobalVariable } from '../services/static-variable';


@Injectable()
export class AccountService {
    headers : Headers;
    constructor(public http: Http) {
    }

    login(email: string, password: string) {
        let body = JSON.stringify({ email: email, password: password });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(GlobalVariable.BASE_API_URL + '/api/Account/Login', body, options)
            .map(data => {
                data.json();
                return data.json();
            });
    }

    registration(email: string, password: string) {
        let body = JSON.stringify({ email: email, password: password });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(GlobalVariable.BASE_API_URL + '/api/Account/Register', body, options)
            .map(data => {
                data.json();
                return data.json();
            });
    }
}