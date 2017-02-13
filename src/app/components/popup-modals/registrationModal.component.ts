import { Component, ViewChild, NgModule, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { UserService, AccountService } from '../../services/index';
import { User } from '../models/user';

export class MyAppModule {}

@Component({
	moduleId: "rmodalModule",
  	selector: 'rmodal',
  	templateUrl: './registrationModal.component.html',
  	providers: [UserService]
})
export class RegistrationModalComponent implements OnInit { 

	public visible = false;
	public visibleAnimate = false;
	public user: User;
	returnUrl: string;

	public registration_success_msg: string = '';
	public registration_fail_msg: string = '';

	constructor(
        public route: ActivatedRoute,
        public router: Router,
        public accountService: AccountService) { 
	}

	ngOnInit() {
	    this.user = {
	    	Id: 0,
	      	email: '',
	      	password: '',
	      	confirmpassword: ''
	    }

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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

	registration(event: any, model: User, isValid: boolean) {
		console.log('model, isValid ' + JSON.stringify(model), isValid);
		event.preventDefault();
		console.log('model, isValid ' + model, isValid);
		if(isValid){
	        this.accountService.registration(model.email, model.password)
	            .subscribe(data => {
	            	console.log(' data ' + JSON.stringify(data));
	            	if(data.Success == true){
	            		this.registration_success_msg = data.Response;	
	            		this.registration_fail_msg = '';
	            	} else {
	            		this.registration_fail_msg = data.Response;	
	            		this.registration_success_msg = '';
	            	}
	                //this.router.navigate([this.returnUrl]);
	            },
	            error => {
	            	console.log(' Error while registration : ' + JSON.stringify(error));
	            	this.registration_fail_msg = error.Response;
	            	this.registration_success_msg = '';
	            });
		}
	}
}

