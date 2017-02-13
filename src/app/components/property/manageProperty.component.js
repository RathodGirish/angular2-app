"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var index_1 = require('../../services/index');
var ng2_datetime_picker_1 = require('ng2-datetime-picker');
var app_component_1 = require('../../app.component');
var Dropzone = require('../../../node_modules/dropzone/dist/dropzone-amd-module.js');
var core_2 = require("angular2-google-maps/core");
var angular2_cool_storage_1 = require('angular2-cool-storage');
var ManagePropertyComponent = (function () {
    function ManagePropertyComponent(route, router, commonAppService, propertyService, uploadPictureService, renderer, mapsAPILoader, ngZone, localStorage) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.commonAppService = commonAppService;
        this.propertyService = propertyService;
        this.uploadPictureService = uploadPictureService;
        this.renderer = renderer;
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.filesUploading = new core_1.EventEmitter();
        this.loading = false;
        this.isEdit = false;
        this.submitBtnText = "Upload";
        this.validImages = true;
        this.validAddress = true;
        this.dropzoneUploadedFiles = [];
        this.selectedPropertyType = "";
        this.selectedAgreement = "";
        this.selectedEmailOnly = false;
        this.selectedPhoneOnly = false;
        this.isActive = false;
        this.isActiveValue = 'No';
        this.isImmediateAvailable = false;
        this.localStorage = localStorage;
        this.propertyId = route.snapshot.params['Id'];
        this.route.params.subscribe(function (params) {
            _this.propertyId = params['Id'];
        });
    }
    ManagePropertyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentUser = this.localStorage.getObject('currentUser');
        console.log(' currentUser ' + JSON.stringify(this.currentUser));
        this.initProperty();
        this.route.params.subscribe(function (params) {
            _this.propertyId = params['Id'];
            if (typeof (_this.propertyId) != "undefined" && _this.propertyId != "new") {
                _this.isEdit = true;
                _this.submitBtnText = 'Save';
                _this.loading = true;
                _this.propertyService.getProperyById(_this.propertyId)
                    .subscribe(function (data) {
                    console.log(' data ' + JSON.stringify(data));
                    _this.property = Object.assign({}, data);
                    _this.initPictures(_this.property.Pictures);
                    _this.selectedPropertyType = _this.property.PropertyType;
                    _this.selectedAgreement = _this.property.AgreementType;
                    _this.selectedEmailOnly = _this.property.IsEmailOnly;
                    _this.selectedPhoneOnly = _this.property.IsPhoneOnly;
                    _this.property.UserId = _this.currentUser.Id;
                    _this.property.Smoking = (_this.property.Smoking) ? "true" : "false";
                    _this.setMapPosition({ 'latitude': _this.property.Latitude, 'longitude': _this.property.Longitude, 'address': _this.property.Address });
                    if (_this.property.IsActive == true) {
                        _this.isActive = _this.property.IsActive;
                        var event_1 = new MouseEvent('click', { bubbles: true });
                        _this.renderer.invokeElementMethod(_this.isActiveToggle.nativeElement, 'dispatchEvent', [event_1]);
                        _this.changeIsActive();
                    }
                    if (_this.property.DateAvailable != null && _this.property.DateAvailable != '') {
                        //this.changeIsImmediateAvailable();
                        _this.property.DateAvailable = _this.commonAppService.getFormattedDate(_this.property.DateAvailable);
                    }
                    if (_this.commonAppService.isUndefined(_this.property.RentInclude)) {
                        _this.property.RentInclude = [];
                    }
                    if (_this.commonAppService.isUndefined(_this.property.Amenities)) {
                        _this.property.Amenities = [];
                    }
                    _this.loading = false;
                }, function (error) {
                    console.log(' Error while getProperyById : ' + JSON.stringify(error));
                    _this.loading = false;
                });
            }
            else {
                _this.isEdit = false;
                _this.submitBtnText = 'Upload';
                _this.initProperty();
                //this.dropzone.emit("resetFiles");
                _this.dropzoneUploadedFiles = [];
                $('.dropzone-drop-area .dz-preview').remove();
                _this.address = "";
                _this.zoom = 9;
                _this.latitude = 49.895136;
                _this.longitude = -97.13837439999998;
            }
            _this.returnUrl = _this.route.snapshot.queryParams['returnUrl'] || '/';
        });
        //set google maps defaults
        this.zoom = 9;
        this.latitude = 49.895136;
        this.longitude = -97.13837439999998;
        //create search FormControl
        this.searchControl = new forms_1.FormControl();
        //load Places Autocomplete
        this.mapsAPILoader.load().then(function () {
            var autocomplete = new google.maps.places.Autocomplete(_this.searchElementRef.nativeElement, {
                types: ["address"],
                componentRestrictions: {
                    country: "ca"
                }
            });
            autocomplete.addListener("place_changed", function () {
                _this.ngZone.run(function () {
                    //get the place result
                    var place = autocomplete.getPlace();
                    _this.address = _this.commonAppService.getFormattedAddress(place);
                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    //set latitude, longitude and zoom
                    _this.latitude = place.geometry.location.lat();
                    _this.longitude = place.geometry.location.lng();
                    console.log(' place.geometry ' + JSON.stringify(place.geometry));
                    console.log(' this.address ' + JSON.stringify(_this.address));
                    if (place.geometry) {
                        _this.property.Latitude = _this.latitude.toString();
                        _this.property.Longitude = _this.longitude.toString();
                    }
                    _this.zoom = 12;
                    _this.validAddress = true;
                    _this.property.Address = _this.address;
                });
            });
        });
    };
    ManagePropertyComponent.prototype.initPictures = function (Pictures) {
        var _thisDropzoneFiles = this.dropzoneUploadedFiles;
        var _loop_1 = function(index) {
            var _thisPicture = Pictures[index];
            var _thisDropzone = this_1.dropzone;
            var _thisDropzoneUploadedFiles = this_1.dropzoneUploadedFiles;
            _thisDropzoneUploadedFiles.push({
                "Id": _thisPicture.Id,
                "PropertyId": _thisPicture.PropertyId,
                "Name": _thisPicture.Name,
                "Url": _thisPicture.Url
            });
            var mockFile = new File([], _thisPicture.Name);
            this_1.dropzone.options.addedfile.call(this_1.dropzone, mockFile);
            this_1.dropzone.options.thumbnail.call(this_1.dropzone, mockFile, _thisPicture.Url);
            this_1.dropzone.emit("complete", mockFile);
            var removeButton = Dropzone.createElement("<a href=\"#\" class='glyphicon glyphicon-remove cursor-pointer'></a>");
            removeButton.addEventListener("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
                // this.parent().remove();
                _thisDropzone.removeFile(mockFile);
                for (var _i = 0, _thisDropzoneUploadedFiles_1 = _thisDropzoneUploadedFiles; _i < _thisDropzoneUploadedFiles_1.length; _i++) {
                    var obj = _thisDropzoneUploadedFiles_1[_i];
                    if (obj.Url == _thisPicture.Url) {
                        _thisDropzoneUploadedFiles.splice(_thisDropzoneUploadedFiles.indexOf(obj), 1);
                    }
                }
                console.log(' inner _thisDropzoneUploadedFiles ' + JSON.stringify(_thisDropzoneUploadedFiles));
            });
            mockFile.previewElement.appendChild(removeButton);
            this_1.dropzoneUploadedFiles = _thisDropzoneUploadedFiles;
        };
        var this_1 = this;
        for (var index in Pictures) {
            _loop_1(index);
        }
    };
    ManagePropertyComponent.prototype.updateLocation = function (event) {
        var newLat = event.coords.lat;
        var newLng = event.coords.lng;
        var latlng = new google.maps.LatLng(newLat, newLng);
        var geocoder = new google.maps.Geocoder();
        var request = {
            latLng: latlng
        };
        this.latitude = this.property.Latitude = newLat;
        this.longitude = this.property.Longitude = newLng;
        this.zoom = 12;
        var __this = this;
        geocoder.geocode(request, function (results, status) {
            var newAddress = __this.commonAppService.getFormattedAddress(results[0]);
            __this.address = __this.property.Address = newAddress;
            //__this.setMapPosition({'latitude': newLat, 'longitude': newLng, 'address': newAddress});
        });
    };
    ManagePropertyComponent.prototype.setMapPosition = function (position) {
        console.log(' setMapPosition ' + JSON.stringify(position));
        this.latitude = this.property.Latitude = position.latitude;
        this.longitude = this.property.Longitude = position.longitude;
        this.address = this.property.Address = position.address;
        this.zoom = 12;
    };
    ManagePropertyComponent.prototype.mapBoundsChanged = function (bounds) {
        //console.log(' mapBoundsChanged call ');
        // if(!this.commonAppService.isUndefined(bounds)){
        //     let center = bounds.getCenter();
        //     let lat = center.lat();
        //     let lng = center.lng();
        //     console.log(' mapBoundsChanged ' + lat + ' | ' + lng);
        // }
    };
    ManagePropertyComponent.prototype.mapIdle = function (bounds) {
        //console.log(' mapIdle call ');
        // if(!this.commonAppService.isUndefined(bounds)){
        //        let center = bounds.getCenter();
        //        let lat = center.lat();
        //        let lng = center.lng();
        //        console.log(' mapIdle ' + lat + ' | ' + lng);
        //    }
    };
    ManagePropertyComponent.prototype.mapCenterChanged = function (event) {
        //console.log(' mapCenterChanged call ');
    };
    ManagePropertyComponent.prototype.initProperty = function () {
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
        };
    };
    ManagePropertyComponent.prototype.changeCheckbox = function (element, flag, field) {
        if (!flag) {
            this.property[field].splice(this.property[field].indexOf(element.value), 1);
        }
        else if (this.property[field].indexOf(element.value) <= -1) {
            this.property[field].push(element.value);
        }
    };
    ManagePropertyComponent.prototype.changeIsActive = function () {
        this.isActive = !this.isActive;
        this.isActiveValue = (this.isActive) ? 'Yes' : 'No';
        this.property.IsActive = this.isActive;
    };
    ManagePropertyComponent.prototype.changeIsImmediateAvailable = function () {
        this.property.IsImmediateAvailable = !this.property.IsImmediateAvailable;
        if (this.property.IsImmediateAvailable == true) {
            $('#DateAvailable').val("");
        }
        console.log(' this.property.DateAvailable ' + this.property.DateAvailable);
    };
    ManagePropertyComponent.prototype.propAvailableDateChange = function () {
        var selectedDate = $('#DateAvailable').val();
        this.property.IsImmediateAvailable = (selectedDate != '') ? false : true;
    };
    ManagePropertyComponent.prototype.manageProperty = function (event, model, isValid) {
        var _this = this;
        event.preventDefault();
        console.log('model, isValid ' + JSON.stringify(model), isValid);
        console.log('this.property ' + JSON.stringify(this.property));
        delete this.property['Pictures'];
        this.property.Pictures = this.dropzoneUploadedFiles;
        this.property.Smoking = (this.property.Smoking == "true") ? "true" : "false";
        this.property.Bed = (this.property.PropertyType == 'Room') ? '' : this.property.Bed;
        this.property.AgreementTermLength = (this.property.AgreementType == 'Month-to-Month') ? '' : this.property.AgreementTermLength;
        this.property.Email = (this.property.IsPhoneOnly == true) ? '' : this.property.Email;
        this.property.Phone = (this.property.IsEmailOnly == true) ? '' : this.property.Phone;
        this.property.IsImmediateAvailable = (this.property.DateAvailable != '') ? false : true;
        if (this.dropzoneUploadedFiles.length <= 0) {
            this.validImages = false;
            return;
        }
        if (this.property.Address == '') {
            this.validAddress = false;
            return;
        }
        if (isValid) {
            var finalObject = {};
            for (var attrname in this.property) {
                finalObject[attrname] = this.property[attrname];
            }
            for (var attrname in model) {
                if (attrname != 'RentInclude' && attrname != 'Amenities' && attrname != 'IsImmediateAvailable') {
                    finalObject[attrname] = model[attrname];
                }
            }
            console.log(' finalObject ' + JSON.stringify(finalObject) + ' \n this.isEdit ' + this.isEdit);
            this.loading = true;
            if (this.isEdit == true) {
                this.propertyService.updateProperty(finalObject)
                    .subscribe(function (data) {
                    _this.loading = false;
                    console.log(' data ' + JSON.stringify(data));
                    //this.router.navigate([this.returnUrl]);
                    _this.router.navigate(['/myrentals']);
                }, function (error) {
                    _this.loading = false;
                    console.log(' Error while updateProperty : ' + JSON.stringify(error));
                });
            }
            else if (this.isEdit == false) {
                this.propertyService.addProperty(finalObject)
                    .subscribe(function (data) {
                    _this.loading = false;
                    console.log(' data ' + JSON.stringify(data));
                    //this.router.navigate([this.returnUrl]);
                    _this.router.navigate(['/myrentals']);
                }, function (error) {
                    _this.loading = false;
                    console.log(' Error while addProperty : ' + JSON.stringify(error));
                });
            }
        }
    };
    ManagePropertyComponent.prototype.mergeObjects = function (obj1, obj2, callback) {
        var obj3 = {};
        for (var attrname in obj1) {
            obj3[attrname] = obj1[attrname];
        }
        for (var attrname in obj2) {
            obj3[attrname] = obj2[attrname];
        }
        callback(obj3);
    };
    Object.defineProperty(ManagePropertyComponent.prototype, "fileDropped", {
        get: function () {
            if (this.dropzone) {
                return this.dropzone.files.length > 0;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    ManagePropertyComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.dropzone = new Dropzone('div#dropzoneFileUpload', {
            url: function (files) {
                _this.filesUploading.emit(files);
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
        var THIS = this;
        this.dropzone.on('addedfile', function (file) {
            _this.uploadPictureService.uploadPicture(file)
                .subscribe(function (data) {
                console.log(' Upload File : ' + JSON.stringify(data));
                if (data[0].url && data[0].url != "") {
                    _this.dropzoneUploadedFiles.push({
                        "Id": 0,
                        "PropertyId": 0,
                        "Name": data[0].name,
                        "Url": data[0].url
                    });
                    file.Url = data[0].Url;
                    _this.validImages = true;
                    console.log('this.dropzoneUploadedFiles2' + JSON.stringify(_this.dropzoneUploadedFiles) + ' file.Url ' + file.Url);
                    //dropzoneUploadedFiles.push(file);
                    var removeButton = Dropzone.createElement("<a href=\"#\" class='glyphicon glyphicon-remove cursor-pointer'></a>");
                    var _thisDropzone_1 = _this.dropzone;
                    var mockFileUrl_1 = file.Url;
                    removeButton.addEventListener("click", function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        _thisDropzone_1.removeFile(file);
                        console.log('mockFileUrl' + JSON.stringify(mockFileUrl_1));
                        //dropzoneFiles.remove(mockFile);
                        console.log('THIS.dropzoneUploadedFiles next' + JSON.stringify(THIS.dropzoneUploadedFiles));
                        for (var _i = 0, _a = THIS.dropzoneUploadedFiles; _i < _a.length; _i++) {
                            var obj = _a[_i];
                            console.log('obj.Url' + JSON.stringify(obj.Url));
                            console.log('mockFileUrl' + JSON.stringify(mockFileUrl_1));
                            if (obj.Url == mockFileUrl_1) {
                                console.log(' ifffff');
                                THIS.dropzoneUploadedFiles.splice(this.dropzoneUploadedFiles.indexOf(obj), 1);
                            }
                        }
                        console.log('THIS.dropzoneUploadedFiles one' + JSON.stringify(THIS.dropzoneUploadedFiles));
                        THIS.dropzoneUploadedFiles = (typeof this.dropzoneUploadedFiles == 'undefined') ? [] : this.dropzoneUploadedFiles;
                        console.log('THIS.dropzoneUploadedFiles' + JSON.stringify(THIS.dropzoneUploadedFiles));
                    });
                    file.previewElement.appendChild(removeButton);
                }
            }, function (error) {
                console.log(' error ' + JSON.stringify(error));
                _this.loading = false;
            });
        }).on('resetFiles', function () {
            // if(this.files.length != 0){
            //     for(let i=0; i<this.files.length; i++){
            //         this.files[i].previewElement.remove();
            //     }
            //     this.files.length = 0;
            // }
        });
    };
    ManagePropertyComponent.prototype.ngOnDestroy = function () {
        this.dropzone.disable();
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ManagePropertyComponent.prototype, "filesUploading", void 0);
    __decorate([
        core_1.ViewChild('isActiveToggle'), 
        __metadata('design:type', core_1.ElementRef)
    ], ManagePropertyComponent.prototype, "isActiveToggle", void 0);
    __decorate([
        core_1.ViewChild("Address"), 
        __metadata('design:type', core_1.ElementRef)
    ], ManagePropertyComponent.prototype, "searchElementRef", void 0);
    ManagePropertyComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'manageProperty',
            styles: ["\n\t    .sebm-google-map-container {\n\t      \theight: 250px;\n\t    }\n\t"],
            templateUrl: 'manageProperty.component.html',
            providers: [angular2_cool_storage_1.CoolLocalStorage]
        }),
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, ng2_datetime_picker_1.Ng2DatetimePickerModule],
            declarations: [app_component_1.AppComponent],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, index_1.CommonAppService, index_1.PropertyService, index_1.UploadPictureService, core_1.Renderer, core_2.MapsAPILoader, core_1.NgZone, angular2_cool_storage_1.CoolLocalStorage])
    ], ManagePropertyComponent);
    return ManagePropertyComponent;
}());
exports.ManagePropertyComponent = ManagePropertyComponent;
//# sourceMappingURL=manageProperty.component.js.map