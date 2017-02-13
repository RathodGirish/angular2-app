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
var core_2 = require("angular2-google-maps/core");
(function (Direction) {
    Direction[Direction["UNKNOWN"] = 0] = "UNKNOWN";
    Direction[Direction["NEXT"] = 1] = "NEXT";
    Direction[Direction["PREV"] = 2] = "PREV";
})(exports.Direction || (exports.Direction = {}));
var Direction = exports.Direction;
var PropertyDetailsComponent = (function () {
    function PropertyDetailsComponent(route, router, commonAppService, propertyService, renderer, mapsAPILoader, ngZone) {
        this.route = route;
        this.router = router;
        this.commonAppService = commonAppService;
        this.propertyService = propertyService;
        this.renderer = renderer;
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.tabActive = 'tabPic';
        this.email_success_msg = '';
        this.email_fail_msg = '';
        this.loading = false;
        this.propertyId = route.snapshot.params['Id'];
    }
    PropertyDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initProperty();
        this.route.params.subscribe(function (params) {
            _this.propertyId = params['Id'];
            if (typeof (_this.propertyId) != "undefined" && _this.propertyId != "new") {
                _this.loading = true;
                _this.propertyService.getProperyById(_this.propertyId)
                    .subscribe(function (data) {
                    console.log(' data ' + JSON.stringify(data));
                    _this.property = Object.assign({}, data);
                    //   	this.latitude = this.property.Latitude;
                    // this.longitude = this.property.Longitude;
                    // this.zoom = 12;
                    _this.loading = false;
                    _this.setMapPosition({ 'latitude': _this.property.Latitude, 'longitude': _this.property.Longitude, 'address': _this.property.Address });
                    if (_this.commonAppService.isUndefined(_this.property.RentInclude)) {
                        _this.property.RentInclude = [];
                    }
                    if (_this.commonAppService.isUndefined(_this.property.Amenities)) {
                        _this.property.Amenities = [];
                    }
                }, function (error) {
                    console.log(' Error while getProperyById :  ' + JSON.stringify(error));
                    _this.loading = false;
                });
            }
            _this.returnUrl = _this.route.snapshot.queryParams['returnUrl'] || '/';
            _this.emailUser = {
                "Name": "",
                "From": "",
                "Recipient": "",
                "Contact": "",
                "Subject": "",
                "Body": ""
            };
        });
        this.mapsAPILoader.load().then(function () {
            _this.latitude = _this.property.Latitude;
            _this.longitude = _this.property.Longitude;
            _this.zoom = 12;
        });
    };
    PropertyDetailsComponent.prototype.setMapPosition = function (position) {
        console.log(' setMapPosition ' + JSON.stringify(position));
        this.latitude = position.latitude;
        this.longitude = position.longitude;
        this.zoom = 9;
        $('#tabMap').next('a').click();
    };
    PropertyDetailsComponent.prototype.changeTab = function (event, tabVal) {
        event.preventDefault();
        this.tabActive = tabVal;
    };
    Object.defineProperty(PropertyDetailsComponent.prototype, "interval", {
        get: function () {
            return this._interval;
        },
        set: function (value) {
            this._interval = value;
            //this.restartTimer();
        },
        enumerable: true,
        configurable: true
    });
    PropertyDetailsComponent.prototype.isActive = function (url) {
        return url === this.property.Pictures[0].Url;
    };
    PropertyDetailsComponent.prototype.initProperty = function () {
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
        };
    };
    PropertyDetailsComponent.prototype.sendEmail = function (event, model, isValid) {
        var _this = this;
        event.preventDefault();
        console.log('model ' + JSON.stringify(model) + ' isValid ' + isValid);
        model.Recipient = 'rathodgirishk@gmail.com';
        if (isValid) {
            this.commonAppService.sendEmail(model)
                .subscribe(function (data) {
                _this.loading = false;
                console.log(' data ' + JSON.stringify(data));
                _this.email_success_msg = data;
                _this.email_fail_msg = '';
            }, function (error) {
                _this.loading = false;
                console.log(' Error while sendEmail : ' + JSON.stringify(error));
                _this.email_fail_msg = error;
            });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PropertyDetailsComponent.prototype, "interval", null);
    PropertyDetailsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'propertyDetails',
            styles: ["\n\t    .sebm-google-map-container {\n\t      \theight: 350px;\n\t    }\n\t"],
            templateUrl: 'propertyDetails.component.html'
        }),
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, ng2_datetime_picker_1.Ng2DatetimePickerModule],
            declarations: [app_component_1.AppComponent],
            bootstrap: [app_component_1.AppComponent],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, index_1.CommonAppService, index_1.PropertyService, core_1.Renderer, core_2.MapsAPILoader, core_1.NgZone])
    ], PropertyDetailsComponent);
    return PropertyDetailsComponent;
}());
exports.PropertyDetailsComponent = PropertyDetailsComponent;
//# sourceMappingURL=propertyDetails.component.js.map