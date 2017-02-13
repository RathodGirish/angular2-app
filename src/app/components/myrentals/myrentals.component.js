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
var MyRentalsComponent = (function () {
    function MyRentalsComponent(route, router, propertyService, commonAppService, localStorage) {
        this.route = route;
        this.router = router;
        this.propertyService = propertyService;
        this.commonAppService = commonAppService;
        this.myrentals = [];
        this.loading = false;
        this._success_msg = '';
        this._fail_msg = '';
        this.visible = false;
        this.visibleAnimate = false;
        this.activeDeactiveMsg = "";
        this.isDeactiveBtn = false;
        this.localStorage = localStorage;
    }
    MyRentalsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentUser = this.localStorage.getObject('currentUser');
        console.log(' currentUser ' + JSON.stringify(this.currentUser));
        if (typeof (this.currentUser) != "undefined" && this.currentUser.Id != null) {
            this.loading = true;
            this.propertyService.getAllPropertiesByUserId(this.currentUser.Id)
                .subscribe(function (data) {
                console.log(' data ' + JSON.stringify(data));
                _this.myrentals = data;
                _this.loading = false;
            }, function (error) {
                console.log(' Error while getProfileById : ' + JSON.stringify(error));
                _this.loading = false;
            });
        }
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    MyRentalsComponent.prototype.editProperty = function (event, prop) {
        event.stopPropagation();
        if (!this.commonAppService.isUndefined(prop.Id)) {
            this.router.navigate([
                'manageProperty', { Id: prop.Id }
            ]);
        }
    };
    MyRentalsComponent.prototype.deleteProperty = function (event, prop) {
        event.stopPropagation();
        console.log(' deleteProperty ' + JSON.stringify(prop));
        this.openModal('deleteAlertModalBtn');
        this.activeDeactiveMsg = (prop.IsActive == true) ? "Deactivate instead! When unit is vacant again, log-in and re-activate it with 1-click." : "Your listing is already hidden from tenants.  Keep it saved for next time.";
        this.isDeactiveBtn = (prop.IsActive == false) ? false : true;
        this.prop = prop;
    };
    MyRentalsComponent.prototype.openModal = function (ButtonId) {
        var _this = this;
        console.log(' ButtonId ' + ButtonId);
        this.visible = true;
        setTimeout(function () { return _this.visibleAnimate = true; });
    };
    MyRentalsComponent.prototype.hideModal = function () {
        var _this = this;
        this.visibleAnimate = false;
        setTimeout(function () { return _this.visible = false; }, 300);
    };
    MyRentalsComponent.prototype.activeDeactiveProperty = function (prop) {
        var _this = this;
        this.loading = true;
        prop.IsActive = !prop.IsActive;
        this.propertyService.activeDeactivePropertyById(prop.Id, prop.IsActive)
            .subscribe(function (data) {
            console.log(' data ' + JSON.stringify(data));
            _this._success_msg = data;
            _this.loading = false;
        }, function (error) {
            console.log(' Error while activeDeactiveProperty : ' + JSON.stringify(error));
            _this._fail_msg = error;
            _this.loading = false;
        });
    };
    MyRentalsComponent.prototype.deActivateProperty = function () {
        console.log(' this.prop ' + JSON.stringify(this.prop));
        if (!this.commonAppService.isUndefined(this.prop)) {
            this.activeDeactiveProperty(this.prop);
        }
        this.hideModal();
    };
    MyRentalsComponent.prototype.setDeleteTrueProperty = function () {
        var _this = this;
        console.log(' this.prop ' + JSON.stringify(this.prop));
        this.loading = true;
        if (!this.commonAppService.isUndefined(this.prop)) {
            this.propertyService.deletePropertyById(this.prop.Id)
                .subscribe(function (data) {
                console.log(' data ' + JSON.stringify(data));
                _this._success_msg = data;
                _this.loading = false;
                _this.myrentals.splice(_this.myrentals.indexOf(_this.prop), 1);
            }, function (error) {
                console.log(' Error while deleteProperty : ' + JSON.stringify(error));
                _this._fail_msg = error;
                _this.loading = false;
            });
        }
        this.hideModal();
    };
    MyRentalsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'myrentals',
            templateUrl: 'myrentals.component.html',
            providers: [angular2_cool_storage_1.CoolLocalStorage]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, index_1.PropertyService, index_1.CommonAppService, angular2_cool_storage_1.CoolLocalStorage])
    ], MyRentalsComponent);
    return MyRentalsComponent;
}());
exports.MyRentalsComponent = MyRentalsComponent;
//# sourceMappingURL=myrentals.component.js.map