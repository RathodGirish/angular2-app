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
var http_1 = require('@angular/http');
var angular2_cool_storage_1 = require('angular2-cool-storage');
var equal_validator_directive_1 = require('./components/forms/equal-validator.directive');
var index_1 = require('./services/index');
var app_component_1 = require('./app.component');
var auth_component_1 = require('./components/auth/auth.component');
var loginModal_component_1 = require('./components/popup-modals/loginModal.component');
var registrationModal_component_1 = require('./components/popup-modals/registrationModal.component');
var user_component_1 = require('./components/user/user.component');
var profile_component_1 = require('./components/profile/profile.component');
var myrentals_component_1 = require('./components/myrentals/myrentals.component');
var home_component_1 = require('./components/home/home.component');
var about_component_1 = require('./components/about/about.component');
var contact_component_1 = require('./components/contact/contact.component');
var navbar_component_1 = require('./components/navbar/navbar.component');
var manageProperty_component_1 = require('./components/property/manageProperty.component');
var propertyDetails_component_1 = require('./components/property/propertyDetails.component');
var map_component_1 = require('./components/map/map.component');
var slide_component_1 = require('./components/custom/slider/slide.component');
var carousel_component_1 = require('./components/custom/slider/carousel.component');
var multiselect_component_1 = require('./components/custom/multiselect/multiselect.component');
var core_2 = require("angular2-google-maps/core");
var app_routing_1 = require('./app.routing');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                core_2.AgmCoreModule.forRoot({
                    apiKey: "AIzaSyBuwOohTTSPG0fe2jsNyWQtmx7ivPz6dmA",
                    libraries: ["places"]
                }),
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule,
                app_routing_1.routing
            ],
            declarations: [
                app_component_1.AppComponent,
                equal_validator_directive_1.EqualValidator,
                navbar_component_1.NavbarComponent,
                loginModal_component_1.LoginModalComponent,
                registrationModal_component_1.RegistrationModalComponent,
                home_component_1.HomeComponent,
                profile_component_1.ProfileComponent,
                myrentals_component_1.MyRentalsComponent,
                user_component_1.UserComponent,
                about_component_1.AboutComponent,
                contact_component_1.ContactComponent,
                manageProperty_component_1.ManagePropertyComponent,
                propertyDetails_component_1.PropertyDetailsComponent,
                map_component_1.MapComponent,
                carousel_component_1.Carousel,
                slide_component_1.Slide,
                multiselect_component_1.Multiselect,
                multiselect_component_1.FilterPipe
            ],
            providers: [
                auth_component_1.AuthComponent,
                index_1.AccountService,
                index_1.UserService,
                index_1.PropertyService,
                index_1.ProfileService,
                index_1.CommonAppService,
                index_1.UploadPictureService,
                angular2_cool_storage_1.CoolLocalStorage
            ],
            bootstrap: [
                app_component_1.AppComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map