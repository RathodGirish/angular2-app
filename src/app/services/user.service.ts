import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
	constructor(public http: Http){
		console.log(' UserService call');
	}

	registerUser(){
		return this.http.get('http://maprental.azurewebsites.net/api/Account/Login')
		.map(res => res.json());
	}
}