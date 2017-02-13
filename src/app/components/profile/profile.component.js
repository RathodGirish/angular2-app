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
var router_1 = require('@angular/router');
var index_1 = require('../../services/index');
var angular2_cool_storage_1 = require('angular2-cool-storage');
var ProfileComponent = (function () {
    function ProfileComponent(route, router, profileService, localStorage) {
        this.route = route;
        this.router = router;
        this.profileService = profileService;
        this.loading = false;
        this._success_msg = '';
        this._fail_msg = '';
        this.localStorage = localStorage;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initProfile();
        this.currentUser = this.localStorage.getObject('currentUser');
        console.log(' currentUser ' + JSON.stringify(this.currentUser));
        if (typeof (this.currentUser) != "undefined" && this.currentUser.Id != null) {
            this.loading = true;
            this.profileService.getProfileById(this.currentUser.Id)
                .subscribe(function (data) {
                console.log(' data ' + JSON.stringify(data));
                _this.profile = data;
                _this.loading = false;
            }, function (error) {
                console.log(' Error while getProfileById : ' + JSON.stringify(error));
                _this.loading = false;
            });
        }
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    ProfileComponent.prototype.initProfile = function () {
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
        };
    };
    ProfileComponent.prototype.updateProfile = function (event, model, isValid) {
        var _this = this;
        event.preventDefault();
        model.Id = this.profile.Id;
        console.log('model ' + JSON.stringify(model));
        console.log('this.profile ' + JSON.stringify(this.profile));
        if (isValid) {
            this.profileService.updateProfile(model)
                .subscribe(function (data) {
                _this.loading = false;
                console.log(' data ' + JSON.stringify(data));
                _this._success_msg = "Profile Updated Successfully";
                //this.router.navigate([this.returnUrl]);
            }, function (error) {
                _this.loading = false;
                _this._fail_msg = "Fail to update Profile " + error;
                console.log(' Error while updateProfile : ' + JSON.stringify(error));
            });
        }
    };
    ProfileComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'profile',
            templateUrl: 'profile.component.html',
            providers: [angular2_cool_storage_1.CoolLocalStorage]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, index_1.ProfileService, angular2_cool_storage_1.CoolLocalStorage])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map