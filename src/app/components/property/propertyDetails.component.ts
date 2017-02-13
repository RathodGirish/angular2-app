import { Component, ViewChild, NgModule, OnInit, Input, Output, AfterViewInit, EventEmitter, OnDestroy, ElementRef, NgZone, Directive, Renderer, HostListener, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormControl  } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Property } from '../models/property';
import { CommonAppService, PropertyService } from '../../services/index';
import { Observable } from 'rxjs/Observable';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';
import { AppComponent } from '../../app.component';
import { AgmCoreModule, MapsAPILoader, NoOpMapsAPILoader, MouseEvent } from "angular2-google-maps/core";

export enum Direction {UNKNOWN, NEXT, PREV}

@Component({
	moduleId: "propertyDetailModule",
  	selector: 'propertyDetails',
  	styles: [`
	    .sebm-google-map-container {
	      	height: 350px;
	    }
	`],
  	templateUrl: './propertyDetails.component.html'
})

@NgModule({
   imports: [BrowserModule, FormsModule, Ng2DatetimePickerModule],
   declarations: [AppComponent],
   bootstrap: [ AppComponent ],
   schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class PropertyDetailsComponent  implements OnInit{ 
	
	public tabActive: string = 'tabPic';

	public email_success_msg: string = '';
	public email_fail_msg: string = '';

	public property: Property;
	public loading: boolean = false;
	public propertyId: string;
	public returnUrl: string;

	public emailUser: EmailUser;

	public latitude: string;
  	public longitude: string;
  	public address: string;
  	public searchControl: FormControl;
  	public zoom: number;
  	public _interval:number;

    constructor(
		public route: ActivatedRoute,
		public router: Router,
        public commonAppService: CommonAppService,
        public propertyService: PropertyService,
        public renderer:Renderer,
        public mapsAPILoader: MapsAPILoader,
    	public ngZone: NgZone) { 
		this.propertyId = route.snapshot.params['Id'];
	}

	ngOnInit() {
		this.initProperty();

		this.route.params.subscribe(params => {
	       	this.propertyId = params['Id'];
			if(typeof(this.propertyId) != "undefined" && this.propertyId != "new"){
				this.loading = true;
				this.propertyService.getProperyById(this.propertyId)
		            .subscribe((data: any) => {
		            	console.log(' data ' + JSON.stringify(data));
		            	this.property = Object.assign({}, data);
		          //   	this.latitude = this.property.Latitude;
        				// this.longitude = this.property.Longitude;
        				// this.zoom = 12;
		            	this.loading = false;
		            	this.setMapPosition({'latitude': this.property.Latitude, 'longitude': this.property.Longitude, 'address': this.property.Address})

		            	if(this.commonAppService.isUndefined(this.property.RentInclude)){
							this.property.RentInclude = [];
						} 

						if(this.commonAppService.isUndefined(this.property.Amenities)){
							this.property.Amenities = [];
						}
		            },
		            (error: any) => {
		            	console.log(' Error while getProperyById :  ' + JSON.stringify(error));
		            	this.loading = false;
		            });

			} 
			this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

			this.emailUser = {
				"Name": "",
				"From": "",
				"Recipient": "",
				"Contact": "",
				"Subject": "",
				"Body": ""
			};
	    });

	    this.mapsAPILoader.load().then(() => {
	    	this.latitude = this.property.Latitude;
			this.longitude = this.property.Longitude;
			this.zoom = 12;
	    });

	}

	public setMapPosition(position: any) {
		console.log(' setMapPosition ' + JSON.stringify(position));
        this.latitude = position.latitude;
        this.longitude = position.longitude;
        this.zoom = 9;
        $('#tabMap').next('a').click();
	}

	public changeTab(event: any, tabVal: string){
		event.preventDefault();
		this.tabActive = tabVal;
	}

	@Input() public get interval():number {
        return this._interval;
    }

    public set interval(value:number) {
        this._interval = value;
        //this.restartTimer();
    }

    isActive(url: string) {
        return url === this.property.Pictures[0].Url;
    }

    public initProperty(){
		this.property = {
	    	"Id": 0,
			"UserId": 0,
			"PropertyType": "",
			"Bed": "",
			"Bath": "",
			"Pet": "",
			"Smoking": "false",
			"RentInclude": [],
			"Parking": "",
			"Amenities": [],
			"LandlordType": "",
			"AgreementType": "",
			"IsImmediateAvailable": false,
			"DateAvailable": "",
			"AgreementTermLength": "",
			"OwnerName": "",
			"Phone": "",
			"IsPhoneOnly": false,
			"Email": "",
			"IsEmailOnly": false,
			"MonthlyRent": '',
			"Address": "",
			"Title": "",
			"Description": "",
			"Latitude": '',
			"Longitude": '',
			"IsActive": true,
			"DateCreated": "",
			"CreatedBy": "",
			"DateModified": "",
			"ModifiedBy": "",
			"Pictures": [],
			"IsDeleted": false
	    }
	}

	sendEmail(event: any, model: any, isValid: boolean) {
		event.preventDefault();
		
		console.log('model ' + JSON.stringify(model) + ' isValid ' + isValid);
		model.Recipient = 'rathodgirishk@gmail.com'

		if(isValid){
			this.commonAppService.sendEmail(model)
	            .subscribe((data: any) => {
	            	this.loading = false;
	            	console.log(' data ' + JSON.stringify(data));
	            	this.email_success_msg = data;
	            	this.email_fail_msg = '';
	            },
	            (error: any) => {
	            	this.loading = false;
	            	console.log(' Error while sendEmail : ' + JSON.stringify(error));
	            	this.email_fail_msg = error;
	            });
	    }
	}
}

export interface EmailUser {
	"Name": "",
	"From": "",
	"Recipient": "",
	"Contact": "",
	"Subject": "",
	"Body": ""
}
