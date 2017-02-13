import { Component, OnInit } from '@angular/core';
import { User } from '../../components/models/user';
import { Profile } from '../../components/models/profile';

import { Router, ActivatedRoute } from '@angular/router';

import { CommonAppService, ProfileService } from '../../services/index';

import { CoolLocalStorage } from 'angular2-cool-storage';

@Component({
	moduleId: "profileModule",
  	selector: 'profile',
  	templateUrl: './profile.component.html',
  	providers: [CoolLocalStorage]
})

export class ProfileComponent  implements OnInit{ 

	currentUser: User;
	profile: Profile;
	public loading: boolean = false;
	localStorage: CoolLocalStorage;
	public returnUrl: string;
	public _success_msg: string = '';
	public _fail_msg: string = '';

	constructor(public route: ActivatedRoute,
		public router: Router,
		public profileService: ProfileService,
		localStorage: CoolLocalStorage) {
	    this.localStorage = localStorage;  
  	}

	ngOnInit() {
		this.initProfile();
	    this.currentUser = this.localStorage.getObject('currentUser');
	    console.log(' currentUser ' + JSON.stringify(this.currentUser));

		if(typeof(this.currentUser) != "undefined" && this.currentUser.Id != null){
			this.loading = true;
			this.profileService.getProfileById(this.currentUser.Id)
	            .subscribe((data: any) => {
	            	console.log(' data ' + JSON.stringify(data));
	            	this.profile = data;
	            	this.loading = false;
	            },
	            (error: any) => {
	            	console.log(' Error while getProfileById : ' + JSON.stringify(error));
	            	this.loading = false;
	            });

		} 
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	}

	public initProfile(){
		this.profile = {
	    	"Id": 0,
			"FirstName": "",
			"LastName": "",
			"Contact": "",
			"Email": "",
			"Password": "",
			"Company": "",
			"Gender": "Male",
			"Picture": "",
			"Salt": "",
			"EmailConfirmed": true,
			"SecurityStamp": "",
			"IsActive": true,
			"DateCreated": "",
			"CreatedBy": "",
			"DateModified": "",
			"ModifiedBy": "",
			"IsDeleted": false
	    }
	}

	updateProfile(event: any, model: Profile, isValid: boolean) {
		event.preventDefault();
		
		model.Id = this.profile.Id;
		console.log('model ' + JSON.stringify(model));
		console.log('this.profile ' + JSON.stringify(this.profile));

		if(isValid){
			this.profileService.updateProfile(model)
	            .subscribe((data: any) => {
	            	this.loading = false;
	            	console.log(' data ' + JSON.stringify(data));
	            	this._success_msg = "Profile Updated Successfully";
	            	//this.router.navigate([this.returnUrl]);
	            },
	            (error: any) => {
	            	this.loading = false;
	            	this._fail_msg = "Fail to update Profile " + error;
	            	console.log(' Error while updateProfile : ' + JSON.stringify(error));
	            });
	    }
	}

}



