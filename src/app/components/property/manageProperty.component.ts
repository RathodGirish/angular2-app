import { Component, ViewChild, NgModule, OnInit, Output, AfterViewInit, EventEmitter, OnDestroy, ElementRef, NgZone, Directive, Renderer } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormControl  } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Property } from '../models/property';
import { CommonAppService, PropertyService, UploadPictureService } from '../../services/index';
import { Observable } from 'rxjs/Observable';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';
import { AppComponent } from '../../app.component';
let Dropzone = require('../../../../node_modules/dropzone/dist/dropzone-amd-module.js');
import { User } from '../../components/models/user';
import { AgmCoreModule, MapsAPILoader, NoOpMapsAPILoader, MouseEvent } from "angular2-google-maps/core";

import { CoolLocalStorage } from 'angular2-cool-storage';

@Component({
	moduleId: "managePropertyModule",
  	selector: 'manageProperty',
  	styles: [`
	    .sebm-google-map-container {
	      	height: 250px;
	    }
	`],
  	templateUrl: './manageProperty.component.html',
  	providers: [CoolLocalStorage]
})

@NgModule({
   	imports: [BrowserModule, FormsModule, Ng2DatetimePickerModule],
   	declarations: [AppComponent],
   	bootstrap: [ AppComponent ]
})

export class ManagePropertyComponent  implements OnInit, AfterViewInit, OnDestroy{ 
	@Output() filesUploading: EventEmitter<File[]> = new EventEmitter<File[]>();

	public property: Property;
	currentUser: User;
	localStorage: CoolLocalStorage;

	public loading: boolean = false;
	public isEdit: boolean = false;
	public submitBtnText: string = "Upload";
	public returnUrl: string;
	public propertyId: string;
	public validImages: boolean = true;
	public validAddress: boolean = true;


	public dropzone: any;
	public dropzoneUploadedFiles :any[] = [];
	public selectedPropertyType: string = "";
	public selectedAgreement: string = "";
	public selectedEmailOnly: boolean = false;
	public selectedPhoneOnly: boolean = false;

	isActive : boolean= false;
	isActiveValue : string= 'No';
	isImmediateAvailable : boolean= false;

	@ViewChild('isActiveToggle') isActiveToggle:ElementRef;

	public latitude: number;
  	public longitude: number;
  	public address: string;
  	public searchControl: FormControl;
  	public zoom: number;

  	@ViewChild("Address")
	public searchElementRef: ElementRef;

	constructor(
		public route: ActivatedRoute,
		public router: Router,
        public commonAppService: CommonAppService,
        public propertyService: PropertyService,
        public uploadPictureService: UploadPictureService,
        public renderer:Renderer,
        public mapsAPILoader: MapsAPILoader,
    	public ngZone: NgZone,
    	localStorage: CoolLocalStorage) { 
		this.localStorage = localStorage;  
		this.propertyId = route.snapshot.params['Id'];

		this.route.params.subscribe(params => {
	       this.propertyId = params['Id'];
	    });		
	}

    ngOnInit() {
    	this.currentUser = this.localStorage.getObject('currentUser');
	    console.log(' currentUser ' + JSON.stringify(this.currentUser));
    	this.initProperty();
    	this.route.params.subscribe(params => {
	       	this.propertyId = params['Id'];
			if(typeof(this.propertyId) != "undefined" && this.propertyId != "new"){
				
				this.isEdit = true;
				this.submitBtnText = 'Save';
				this.loading = true;
				this.propertyService.getProperyById(this.propertyId)
		            .subscribe((data: any) => {
		            	
		            	console.log(' data ' + JSON.stringify(data));
		            	this.property = Object.assign({}, data);
		            	this.initPictures(this.property.Pictures);
		            	this.selectedPropertyType = this.property.PropertyType;
						this.selectedAgreement = this.property.AgreementType;
						this.selectedEmailOnly = this.property.IsEmailOnly;
						this.selectedPhoneOnly = this.property.IsPhoneOnly;
						this.property.UserId = this.currentUser.Id;
						this.property.Smoking = (this.property.Smoking)? "true": "false";

						this.setMapPosition({'latitude': this.property.Latitude, 'longitude': this.property.Longitude, 'address': this.property.Address});

						if(this.property.IsActive == true){
							this.isActive = this.property.IsActive;
							let event = new MouseEvent('click', {bubbles: true});
							this.renderer.invokeElementMethod(this.isActiveToggle.nativeElement, 'dispatchEvent', [event]);
							this.changeIsActive();
						}

						if(this.property.DateAvailable != null && this.property.DateAvailable != ''){
							//this.changeIsImmediateAvailable();
							this.property.DateAvailable = this.commonAppService.getFormattedDate(this.property.DateAvailable);
						}

						if(this.commonAppService.isUndefined(this.property.RentInclude)){
							this.property.RentInclude = [];
						} 

						if(this.commonAppService.isUndefined(this.property.Amenities)){
							this.property.Amenities = [];
						}

		            	this.loading = false;
		            },
		            (error: any) => {
		            	console.log(' Error while getProperyById : ' + JSON.stringify(error));
		            	this.loading = false;
		            });
			    // } else {

			    // }
			} else {

				this.isEdit = false;
				this.submitBtnText = 'Upload';
				this.initProperty();
			    //this.dropzone.emit("resetFiles");
			    this.dropzoneUploadedFiles = [];
			    $('.dropzone-drop-area .dz-preview').remove();

		        this.address = "";
		        this.zoom = 9;
			    this.latitude = 49.895136;
			    this.longitude = -97.13837439999998;
			}
			this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	    });

    	//set google maps defaults
	    this.zoom = 9;
	    this.latitude = 49.895136;
	    this.longitude = -97.13837439999998;

	    //create search FormControl
	    this.searchControl = new FormControl();

	    //load Places Autocomplete
	    this.mapsAPILoader.load().then(() => {

	      	let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
	        	types: ["address"],
		        componentRestrictions: {
		            country: "ca"
		        }
	      	});

	      	autocomplete.addListener("place_changed", () => {
	        	this.ngZone.run(() => {
		          	//get the place result
		          	let place: google.maps.places.PlaceResult = autocomplete.getPlace();
		          	this.address = this.commonAppService.getFormattedAddress(place);

		          	//verify result
		          	if (place.geometry === undefined || place.geometry === null) {
		            	return;
		          	}

		          	//set latitude, longitude and zoom
		          	this.latitude = place.geometry.location.lat();
		          	this.longitude = place.geometry.location.lng();
		          	console.log(' place.geometry ' + JSON.stringify(place.geometry));
		          	console.log(' this.address ' + JSON.stringify(this.address));
		          	if(place.geometry){
		          		this.property.Latitude = this.latitude.toString();
		          		this.property.Longitude = this.longitude.toString();
		          	}
		          	this.zoom = 12;
		          	this.validAddress = true;
		          	this.property.Address = this.address;
		        });
	      	});
	    });
	}
	public initPictures(Pictures: any[]){
		let _thisDropzoneFiles = this.dropzoneUploadedFiles;

		for (let index in Pictures) { 
			let _thisPicture = Pictures[index];

			let _thisDropzone = this.dropzone;
			let _thisDropzoneUploadedFiles: any[] = this.dropzoneUploadedFiles;
	        _thisDropzoneUploadedFiles.push({
	        	"Id": _thisPicture.Id,
	        	"PropertyId": _thisPicture.PropertyId,
                "Name": _thisPicture.Name,
                "Url": _thisPicture.Url
	        });

			let mockFile: any = new File([], _thisPicture.Name);

	        this.dropzone.options.addedfile.call(this.dropzone, mockFile);
	        this.dropzone.options.thumbnail.call(this.dropzone, mockFile, _thisPicture.Url);
	        this.dropzone.emit("complete", mockFile);
	        let removeButton = Dropzone.createElement("<a href=\"#\" class='glyphicon glyphicon-remove cursor-pointer'></a>");
	        removeButton.addEventListener("click", function(e: any) {
	            e.preventDefault();
	            e.stopPropagation();
	           	// this.parent().remove();
	           	_thisDropzone.removeFile(mockFile);

	            for(let obj of _thisDropzoneUploadedFiles) {
                    if(obj.Url == _thisPicture.Url){
                    	_thisDropzoneUploadedFiles.splice(_thisDropzoneUploadedFiles.indexOf(obj), 1);
                    }
                }
	            console.log(' inner _thisDropzoneUploadedFiles ' + JSON.stringify(_thisDropzoneUploadedFiles));
	        });
	        mockFile.previewElement.appendChild(removeButton);
	        this.dropzoneUploadedFiles = _thisDropzoneUploadedFiles;
        }
	}

	updateLocation(event: any){
		let newLat = event.coords.lat;
		let newLng = event.coords.lng;
		let latlng = new google.maps.LatLng(newLat, newLng);
		let geocoder = new google.maps.Geocoder();
		let request = {
          	latLng: latlng
        };  

        this.latitude = this.property.Latitude = newLat;
        this.longitude = this.property.Longitude = newLng;
        this.zoom = 12;

		let __this = this;
		geocoder.geocode(request, function(results: any, status: any) {
			let newAddress = __this.commonAppService.getFormattedAddress(results[0]);
			__this.address = __this.property.Address = newAddress;
			//__this.setMapPosition({'latitude': newLat, 'longitude': newLng, 'address': newAddress});
		});
	}

	public setMapPosition(position: any) {
		console.log(' setMapPosition ' + JSON.stringify(position));
        this.latitude = this.property.Latitude = position.latitude;
        this.longitude = this.property.Longitude = position.longitude;
        this.address = this.property.Address = position.address;
        this.zoom = 12;
	}

	mapBoundsChanged(bounds: any){
		//console.log(' mapBoundsChanged call ');
        // if(!this.commonAppService.isUndefined(bounds)){

        //     let center = bounds.getCenter();
        //     let lat = center.lat();
        //     let lng = center.lng();
        //     console.log(' mapBoundsChanged ' + lat + ' | ' + lng);
           
        // }
    }

	mapIdle(bounds: any){
		//console.log(' mapIdle call ');
		// if(!this.commonAppService.isUndefined(bounds)){
	 //        let center = bounds.getCenter();
	 //        let lat = center.lat();
	 //        let lng = center.lng();
	 //        console.log(' mapIdle ' + lat + ' | ' + lng);
	 //    }
    }

    mapCenterChanged(event: any){
        //console.log(' mapCenterChanged call ');
    }

	public initProperty(){
		this.property = {
	    	"Id": 0,
			"UserId": this.currentUser.Id,
			"PropertyType": "",
			"Bed": "",
			"Bath": "",
			"Pet": "",
			"Smoking": "",
			"RentInclude": [],
			"Parking": "",
			"Amenities": [],
			"LandlordType": "",
			"AgreementType": "",
			"IsImmediateAvailable": null,
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

	public changeCheckbox(element: any, flag: boolean, field: any){
    	if(!flag){
    		this.property[field].splice(this.property[field].indexOf(element.value), 1);
    	} else if(this.property[field].indexOf(element.value) <= -1){
    		this.property[field].push(element.value);	
    	}
    }

    changeIsActive(){
	    this.isActive = !this.isActive;
	    this.isActiveValue = (this.isActive)? 'Yes' : 'No';
	    this.property.IsActive = this.isActive;
	}

	changeIsImmediateAvailable(){
		this.property.IsImmediateAvailable = !this.property.IsImmediateAvailable;
		if(this.property.IsImmediateAvailable == true){
			$('#DateAvailable').val("");	
		}
	    
	    console.log(' this.property.DateAvailable ' + this.property.DateAvailable);
	}

	propAvailableDateChange(){
		let selectedDate = $('#DateAvailable').val();
		this.property.IsImmediateAvailable = (selectedDate != '')? false: true;
	}

	manageProperty(event: any, model: Property, isValid: boolean) {
		event.preventDefault();
		console.log('model, isValid ' + JSON.stringify(model), isValid);
		console.log('this.property ' + JSON.stringify(this.property));

		delete this.property['Pictures'];
		this.property.Pictures = this.dropzoneUploadedFiles;
		this.property.Smoking = (this.property.Smoking == "true")? "true": "false";

		this.property.Bed = (this.property.PropertyType == 'Room')? '': this.property.Bed;

		this.property.AgreementTermLength = (this.property.AgreementType == 'Month-to-Month')? '': this.property.AgreementTermLength;

		this.property.Email = (this.property.IsPhoneOnly == true)? '': this.property.Email;
		this.property.Phone = (this.property.IsEmailOnly == true)? '': this.property.Phone;

		this.property.IsImmediateAvailable = (this.property.DateAvailable != '')? false: true;

		if(this.dropzoneUploadedFiles.length <=0 ){
			this.validImages = false;
			return;
		}

		if(this.property.Address == ''){
			this.validAddress = false;
			return;
		}

		if(isValid){
			var finalObject = {};

			for (var attrname in this.property) { 
				finalObject[attrname] = this.property[attrname]; 
			}

			for (var attrname in model) { 
				if(attrname != 'RentInclude' && attrname != 'Amenities' && attrname != 'IsImmediateAvailable'){
					finalObject[attrname] = model[attrname]; 
				}
			}
		    		    
			console.log(' finalObject ' + JSON.stringify(finalObject) + ' \n this.isEdit ' + this.isEdit);
			this.loading = true;
			if(this.isEdit == true){
				this.propertyService.updateProperty(finalObject)
		            .subscribe((data: any) => {
		            	this.loading = false;
		            	console.log(' data ' + JSON.stringify(data));
		            	//this.router.navigate([this.returnUrl]);
		            	this.router.navigate(['/myrentals']);
		            },
		            (error: any) => {
		            	this.loading = false;
		            	console.log(' Error while updateProperty : ' + JSON.stringify(error));
		            });
			} else if(this.isEdit == false){
				this.propertyService.addProperty(finalObject)
		            .subscribe((data: any) => {
		            	this.loading = false;
		            	console.log(' data ' + JSON.stringify(data));
		            	//this.router.navigate([this.returnUrl]);
		            	this.router.navigate(['/myrentals']);
		            },
		            (error: any) => {
		            	this.loading = false;
		            	console.log(' Error while addProperty : ' + JSON.stringify(error));
		            });
		    }
		} 
	}

	mergeObjects(obj1: any, obj2: any, callback: any){
	    var obj3 = {};
	    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
	    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
	    callback(obj3);
	}

	get fileDropped(): boolean {
	    if (this.dropzone) {
	      return this.dropzone.files.length > 0;
	    }
	    return false;
	}

	ngAfterViewInit() {
	    this.dropzone = new Dropzone('div#dropzoneFileUpload', {
	      	url: (files: any) => {
	        	this.filesUploading.emit(files);
	      	},
	      	autoProcessQueue: false,
	      	uploadMultiple: true,
	      	parallelUploads: 20,
	      	hiddenInputContainer: '#dropzone-drop-area',
	      	dictDefaultMessage: "Click/Drag images here to upload",
	      	maxFiles: 5,
	      	acceptedFiles: 'image/*',
	      	clickable: '#dropzone-drop-area',
	      	previewsContainer: '#dropzone-drop-area',
	      	previewTemplate: '<div class="dz-preview dz-file-preview"><div class="dz-details"><img data-dz-thumbnail/></div></div>'
	    });
	    this.dropzone.autoDiscover = true;

	    let THIS = this;
	    this.dropzone.on('addedfile', (file: any) => {
	        this.uploadPictureService.uploadPicture(file)
	            .subscribe((data: any) => {
	                console.log(' Upload File : ' + JSON.stringify(data));
	                if(data[0].url && data[0].url !=""){
	                    this.dropzoneUploadedFiles.push({
	                        "Id": 0,
	                        "PropertyId": 0,
	                        "Name": data[0].name,
	                        "Url": data[0].url
	                    });
	                    file.Url = data[0].Url;
	                    this.validImages = true;

	                    console.log('this.dropzoneUploadedFiles2' + JSON.stringify(this.dropzoneUploadedFiles) + ' file.Url ' + file.Url);
		                //dropzoneUploadedFiles.push(file);
		                let removeButton = Dropzone.createElement("<a href=\"#\" class='glyphicon glyphicon-remove cursor-pointer'></a>");
			            let _thisDropzone = this.dropzone;

			            let mockFileUrl = file.Url;

			            removeButton.addEventListener("click", function(e: any) {
			                e.preventDefault();
			                e.stopPropagation();
			                _thisDropzone.removeFile(file);
			                console.log('mockFileUrl' + JSON.stringify(mockFileUrl));
			                //dropzoneFiles.remove(mockFile);
			                console.log('THIS.dropzoneUploadedFiles next' + JSON.stringify(THIS.dropzoneUploadedFiles));

			                for(let obj of THIS.dropzoneUploadedFiles) {
			                	console.log('obj.Url' + JSON.stringify(obj.Url));
			                	console.log('mockFileUrl' + JSON.stringify(mockFileUrl));
			                    if(obj.Url == mockFileUrl){
			                    	console.log(' ifffff');
			                    	THIS.dropzoneUploadedFiles.splice(this.dropzoneUploadedFiles.indexOf(obj), 1);
			                        //this.dropzoneUploadedFiles.remove(obj);   
			                    }
			                }

			                console.log('THIS.dropzoneUploadedFiles one' + JSON.stringify(THIS.dropzoneUploadedFiles));

			                THIS.dropzoneUploadedFiles = (typeof this.dropzoneUploadedFiles == 'undefined')? []: this.dropzoneUploadedFiles;
			                console.log('THIS.dropzoneUploadedFiles' + JSON.stringify(THIS.dropzoneUploadedFiles));

			            });
			            file.previewElement.appendChild(removeButton);
	                }
	            },
	            (error: any) => {
	                console.log(' error ' + JSON.stringify(error));
	                this.loading = false;
	            });

	            
	    }).on('resetFiles', function() {

	        // if(this.files.length != 0){
	        //     for(let i=0; i<this.files.length; i++){
	        //         this.files[i].previewElement.remove();
	        //     }
	        //     this.files.length = 0;
	        // }
	    });
	}
 
	ngOnDestroy() {
	    this.dropzone.disable();
	}
	
}

