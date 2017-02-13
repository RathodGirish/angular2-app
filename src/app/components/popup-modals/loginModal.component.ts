import { Component, ViewChild, NgModule, OnInit, Inject, Renderer } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response, Headers, Request, RequestOptions, RequestMethod, URLSearchParams } from '@angular/http';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { User } from '../models/user';

import { UserService, AccountService } from '../../services/index';

import { CoolLocalStorage } from 'angular2-cool-storage';

@Component({
	moduleId: "lmodalModule",
  	selector: 'lmodal',
  	templateUrl: './loginModal.component.html',
  	providers: [CoolLocalStorage]
})

export class LoginModalComponent implements OnInit { 

	public visible = false;
	public visibleAnimate = false;
	returnUrl: string;
	public login_success_msg: string = '';
	public login_fail_msg: string = '';
	public user: User;
	localStorage: CoolLocalStorage;

	@ViewChild('navbarbrand')
  	 public navbarbrand: any;

    constructor(public route: ActivatedRoute,
        public router: Router,
        public accountService: AccountService,
        public http: Http, 
        localStorage: CoolLocalStorage,
        @Inject(Renderer) public renderer: Renderer) {
        this.localStorage = localStorage; 
        console.log(' constructor call '); 
    }

    putCookie(key: string, value: Object){

        console.log(' key ' + JSON.stringify(key));
        console.log(' value ' + JSON.stringify(value));
        this.localStorage.setObject(key, value);
        //return this.cookieService.putObject(key, value);
    }

	ngOnInit() {
	    this.user = {
	    	Id: 0,
	      	email: '',
	      	password: '',
	      	confirmpassword: ''
	    }

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigateByUrl('/');
	}

	public show(): void {
	  	this.visible = true;
	  	setTimeout(() => this.visibleAnimate = true);
	}

	public hide(): void {
	  	this.visibleAnimate = false;
	  	setTimeout(() => this.visible = false, 300);
	}

	openModal(id: string){
		this.hide();
	    document.getElementById(id).click();
	}

	login(event: any, model: User, isValid: boolean) {
		event.preventDefault();
		console.log('model, isValid ' + model, isValid);
		if(isValid){
	        this.accountService.login(model.email, model.password)
	            .subscribe(data => {
	            	console.log(' data ' + JSON.stringify(data));
	            	if(data.Success == true){
	            		this.login_success_msg = 'Login Successfull';
	            		this.login_fail_msg = '';	
	            		//this.putCookie('currentUser', data.Response);
	            		this.localStorage.setObject('currentUser', data.Response);
	            		this.renderer.invokeElementMethod(this.navbarbrand.nativeElement, 'click', []);
	            	} else {
	            		this.login_fail_msg = data.Response;
	            		this.login_success_msg = '';	
	            	}
	            },
	            error => {
	            	console.log(' Error while login ' + JSON.stringify(error));
	                this.login_fail_msg = error.Response;
	                this.login_success_msg = '';
	            });
		}
	}
}
