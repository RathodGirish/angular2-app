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
var MyAppModule = (function () {
    function MyAppModule() {
    }
    return MyAppModule;
}());
exports.MyAppModule = MyAppModule;
var RegistrationModalComponent = (function () {
    function RegistrationModalComponent(route, router, accountService) {
        this.route = route;
        this.router = router;
        this.accountService = accountService;
        this.visible = false;
        this.visibleAnimate = false;
        this.registration_success_msg = '';
        this.registration_fail_msg = '';
    }
    RegistrationModalComponent.prototype.ngOnInit = function () {
        this.user = {
            Id: 0,
            email: '',
            password: '',
            confirmpassword: ''
        };
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    RegistrationModalComponent.prototype.show = function () {
        var _this = this;
        this.visible = true;
        setTimeout(function () { return _this.visibleAnimate = true; });
    };
    RegistrationModalComponent.prototype.hide = function () {
        var _this = this;
        this.visibleAnimate = false;
        setTimeout(function () { return _this.visible = false; }, 300);
    };
    RegistrationModalComponent.prototype.openModal = function (id) {
        this.hide();
        document.getElementById(id).click();
    };
    RegistrationModalComponent.prototype.registration = function (event, model, isValid) {
        var _this = this;
        console.log('model, isValid ' + JSON.stringify(model), isValid);
        event.preventDefault();
        console.log('model, isValid ' + model, isValid);
        if (isValid) {
            this.accountService.registration(model.email, model.password)
                .subscribe(function (data) {
                console.log(' data ' + JSON.stringify(data));
                if (data.Success == true) {
                    _this.registration_success_msg = data.Response;
                    _this.registration_fail_msg = '';
                }
                else {
                    _this.registration_fail_msg = data.Response;
                    _this.registration_success_msg = '';
                }
                //this.router.navigate([this.returnUrl]);
            }, function (error) {
                console.log(' Error while registration : ' + JSON.stringify(error));
                _this.registration_fail_msg = error.Response;
                _this.registration_success_msg = '';
            });
        }
    };
    RegistrationModalComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'rmodal',
            templateUrl: 'registrationModal.component.html',
            providers: [index_1.UserService]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, index_1.AccountService])
    ], RegistrationModalComponent);
    return RegistrationModalComponent;
}());
exports.RegistrationModalComponent = RegistrationModalComponent;
//# sourceMappingURL=registrationModal.component.js.map