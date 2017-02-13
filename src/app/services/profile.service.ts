import { Component, Injectable, NgModule, Inject } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions, RequestMethod, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { GlobalVariable } from '../services/static-variable';


@Injectable()
export class ProfileService {
    constructor(public http: Http) {
    }

    getProfileById(Id: number) {
        return this.http.get(GlobalVariable.BASE_API_URL + GlobalVariable.GET_PROFILE_BY_ID + '/' + Id)
            .map((data: any) => {
                data.json();
                return data.json();
            });
    }

    updateProfile(profile: any) {
        let body = JSON.stringify(profile);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(GlobalVariable.BASE_API_URL + GlobalVariable.UPDATE_PROFILE, body, options)
            .map((data: any) => {
                data.json();
                return data.json();
            });
    }
}