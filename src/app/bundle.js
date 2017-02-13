var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
System.register("components/forms/equal-validator.directive", ['@angular/core', '@angular/forms'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, forms_1;
    var EqualValidator;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            }],
        execute: function() {
            let EqualValidator_1 = class EqualValidator {
                constructor(validateEqual, reverse) {
                    this.validateEqual = validateEqual;
                    this.reverse = reverse;
                }
                get isReverse() {
                    if (!this.reverse)
                        return false;
                    return this.reverse === 'true' ? true : false;
                }
                validate(c) {
                    // self value
                    let v = c.value;
                    // control vlaue
                    let e = c.root.get(this.validateEqual);
                    // value not equal
                    if (e && v !== e.value && !this.isReverse) {
                        return {
                            validateEqual: false
                        };
                    }
                    // value equal and reverse
                    if (e && v === e.value && this.isReverse) {
                        delete e.errors['validateEqual'];
                        if (!Object.keys(e.errors).length)
                            e.setErrors(null);
                    }
                    // value not equal and reverse
                    if (e && v !== e.value && this.isReverse) {
                        e.setErrors({
                            validateEqual: false
                        });
                    }
                    return null;
                }
            };
            let EqualValidator = EqualValidator_1;
            EqualValidator = EqualValidator_1 = __decorate([
                core_1.Directive({
                    selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
                    providers: [
                        { provide: forms_1.NG_VALIDATORS, useExisting: core_1.forwardRef(() => EqualValidator), multi: true }
                    ]
                }),
                __param(0, core_1.Attribute('validateEqual')),
                __param(1, core_1.Attribute('reverse')), 
                __metadata('design:paramtypes', [String, String])
            ], EqualValidator);
            exports_1("EqualValidator", EqualValidator);
        }
    }
});
System.register("services/static-variable", [], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var GlobalVariable;
    return {
        setters:[],
        execute: function() {
            exports_2("GlobalVariable", GlobalVariable = Object.freeze({
                BASE_API_URL: 'http://maprental.azurewebsites.net',
                GET_ALL_PROPERTY: '/api/Property/GetAllProperties',
                GET_ALL_PROPERTY_BY_LAT_LONG: '/api/Property/GetAllPropertiesByLatLong',
                GET_ALL_PROPERTY_BY_LAT_LONG2: '/api/Property/GetAllPropertiesByLatLong2',
                GET_ALL_PROPERTY_BY_GEO_LAT_LONG: '/api/Property/GetAllPropertiesByGeoLatLong',
                ADD_PROPERTY: '/api/Property/AddProperty',
                UPDATE_PROPERTY: '/api/Property/UpdateProperty',
                DEACTIVE_PROPERTY_BY_ID: '/api/Property/DeActivate',
                ACTIVE_PROPERTY_BY_ID: '/api/Property/Activate',
                DELETE_PROPERTY_BY_ID: '/api/Property/Delete',
                GET_PROPERTY_BY_ID: '/api/Property/GetPropertyById',
                GET_PROPERTY_BY_USERID: '/api/Property/GetAllPropertiesByUserId',
                UPDATE_PROFILE: '/api/User/UpdateProfile',
                GET_PROFILE_BY_ID: '/api/User/GetProfileById',
                SEND_EMAIL: '/api/User/SendEmail',
                UPLOAD_PICTURE: '/api/Picture/Upload'
            }));
        }
    }
});
System.register("services/account.service", ['@angular/core', '@angular/http', 'rxjs/add/operator/map', "services/static-variable"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var core_2, http_1, static_variable_1;
    var AccountService;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (static_variable_1_1) {
                static_variable_1 = static_variable_1_1;
            }],
        execute: function() {
            AccountService = class AccountService {
                constructor(http) {
                    this.http = http;
                }
                login(email, password) {
                    let body = JSON.stringify({ email: email, password: password });
                    let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    let options = new http_1.RequestOptions({ headers: headers });
                    return this.http.post(static_variable_1.GlobalVariable.BASE_API_URL + '/api/Account/Login', body, options)
                        .map(data => {
                        data.json();
                        return data.json();
                    });
                }
                registration(email, password) {
                    let body = JSON.stringify({ email: email, password: password });
                    let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    let options = new http_1.RequestOptions({ headers: headers });
                    return this.http.post(static_variable_1.GlobalVariable.BASE_API_URL + '/api/Account/Register', body, options)
                        .map(data => {
                        data.json();
                        return data.json();
                    });
                }
            };
            AccountService = __decorate([
                core_2.Injectable(), 
                __metadata('design:paramtypes', [http_1.Http])
            ], AccountService);
            exports_3("AccountService", AccountService);
        }
    }
});
System.register("services/user.service", ['@angular/core', '@angular/http', 'rxjs/add/operator/map'], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var core_3, http_2;
    var UserService;
    return {
        setters:[
            function (core_3_1) {
                core_3 = core_3_1;
            },
            function (http_2_1) {
                http_2 = http_2_1;
            },
            function (_2) {}],
        execute: function() {
            UserService = class UserService {
                constructor(http) {
                    this.http = http;
                    console.log(' UserService call');
                }
                registerUser() {
                    return this.http.get('http://maprental.azurewebsites.net/api/Account/Login')
                        .map(res => res.json());
                }
            };
            UserService = __decorate([
                core_3.Injectable(), 
                __metadata('design:paramtypes', [http_2.Http])
            ], UserService);
            exports_4("UserService", UserService);
        }
    }
});
System.register("services/property.service", ['@angular/core', '@angular/http', 'rxjs/add/operator/map', "services/static-variable"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var core_4, http_3, static_variable_2;
    var PropertyService;
    return {
        setters:[
            function (core_4_1) {
                core_4 = core_4_1;
            },
            function (http_3_1) {
                http_3 = http_3_1;
            },
            function (_3) {},
            function (static_variable_2_1) {
                static_variable_2 = static_variable_2_1;
            }],
        execute: function() {
            PropertyService = class PropertyService {
                constructor(http) {
                    this.http = http;
                }
                getAllProperties() {
                    return this.http.get(static_variable_2.GlobalVariable.BASE_API_URL + static_variable_2.GlobalVariable.GET_ALL_PROPERTY)
                        .map((data) => {
                        data.json();
                        return data.json();
                    });
                }
                getAllPropertiesByLatLong(lat, long, limit) {
                    return this.http.get(static_variable_2.GlobalVariable.BASE_API_URL + static_variable_2.GlobalVariable.GET_ALL_PROPERTY_BY_LAT_LONG + '?latitude= ' + lat + '&longitude=' + long + '&limit=' + limit)
                        .map((data) => {
                        data.json();
                        return data.json();
                    });
                }
                getAllPropertiesByLatLong2(lat1, lat2, long1, long2, limit) {
                    return this.http.get(static_variable_2.GlobalVariable.BASE_API_URL + static_variable_2.GlobalVariable.GET_ALL_PROPERTY_BY_LAT_LONG2 + '?lat1= ' + lat1 + '&lat2=' + lat2 + '&long1=' + long1 + '&long2=' + long2 + '&limit=' + limit)
                        .map((data) => {
                        data.json();
                        return data.json();
                    });
                }
                getAllPropertiesByGeoLatLong(lat, long, limit) {
                    return this.http.get(static_variable_2.GlobalVariable.BASE_API_URL + static_variable_2.GlobalVariable.GET_ALL_PROPERTY_BY_GEO_LAT_LONG + '?latitude= ' + lat + '&longitude=' + long + '&limit=' + limit)
                        .map((data) => {
                        data.json();
                        return data.json();
                    });
                }
                getProperyById(Id) {
                    return this.http.get(static_variable_2.GlobalVariable.BASE_API_URL + static_variable_2.GlobalVariable.GET_PROPERTY_BY_ID + '/' + Id)
                        .map((data) => {
                        data.json();
                        return data.json();
                    });
                }
                getAllPropertiesByUserId(Id) {
                    return this.http.get(static_variable_2.GlobalVariable.BASE_API_URL + static_variable_2.GlobalVariable.GET_PROPERTY_BY_USERID + '?userId=' + Id)
                        .map((data) => {
                        data.json();
                        return data.json();
                    });
                }
                addProperty(property) {
                    let body = JSON.stringify(property);
                    let headers = new http_3.Headers({ 'Content-Type': 'application/json' });
                    let options = new http_3.RequestOptions({ headers: headers });
                    return this.http.post(static_variable_2.GlobalVariable.BASE_API_URL + static_variable_2.GlobalVariable.ADD_PROPERTY, body, options)
                        .map((data) => {
                        data.json();
                        return data.json();
                    });
                }
                updateProperty(property) {
                    let body = JSON.stringify(property);
                    let headers = new http_3.Headers({ 'Content-Type': 'application/json' });
                    let options = new http_3.RequestOptions({ headers: headers });
                    console.log(' updateProperty call');
                    return this.http.post(static_variable_2.GlobalVariable.BASE_API_URL + static_variable_2.GlobalVariable.UPDATE_PROPERTY, body, options)
                        .map((data) => {
                        data.json();
                        return data.json();
                    });
                }
                activeDeactivePropertyById(Id, status) {
                    let ActiveDeactiveUrl = (status == true) ? static_variable_2.GlobalVariable.ACTIVE_PROPERTY_BY_ID : static_variable_2.GlobalVariable.DEACTIVE_PROPERTY_BY_ID;
                    let body = {};
                    let headers = new http_3.Headers({ 'Content-Type': 'application/json' });
                    let options = new http_3.RequestOptions({ headers: headers });
                    console.log(' ActiveDeactiveUrl ' + ActiveDeactiveUrl);
                    return this.http.post(static_variable_2.GlobalVariable.BASE_API_URL + ActiveDeactiveUrl + '/' + Id, body, options)
                        .map((data) => {
                        data.json();
                        return data.json();
                    });
                }
                deletePropertyById(Id) {
                    let body = {};
                    let headers = new http_3.Headers({ 'Content-Type': 'application/json' });
                    let options = new http_3.RequestOptions({ headers: headers });
                    return this.http.post(static_variable_2.GlobalVariable.BASE_API_URL + static_variable_2.GlobalVariable.DELETE_PROPERTY_BY_ID + '/' + Id, body, options)
                        .map((data) => {
                        data.json();
                        return data.json();
                    });
                }
            };
            PropertyService = __decorate([
                core_4.Injectable(), 
                __metadata('design:paramtypes', [http_3.Http])
            ], PropertyService);
            exports_5("PropertyService", PropertyService);
        }
    }
});
System.register("services/profile.service", ['@angular/core', '@angular/http', 'rxjs/add/operator/map', "services/static-variable"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var core_5, http_4, static_variable_3;
    var ProfileService;
    return {
        setters:[
            function (core_5_1) {
                core_5 = core_5_1;
            },
            function (http_4_1) {
                http_4 = http_4_1;
            },
            function (_4) {},
            function (static_variable_3_1) {
                static_variable_3 = static_variable_3_1;
            }],
        execute: function() {
            ProfileService = class ProfileService {
                constructor(http) {
                    this.http = http;
                }
                getProfileById(Id) {
                    return this.http.get(static_variable_3.GlobalVariable.BASE_API_URL + static_variable_3.GlobalVariable.GET_PROFILE_BY_ID + '/' + Id)
                        .map((data) => {
                        data.json();
                        return data.json();
                    });
                }
                updateProfile(profile) {
                    let body = JSON.stringify(profile);
                    let headers = new http_4.Headers({ 'Content-Type': 'application/json' });
                    let options = new http_4.RequestOptions({ headers: headers });
                    return this.http.post(static_variable_3.GlobalVariable.BASE_API_URL + static_variable_3.GlobalVariable.UPDATE_PROFILE, body, options)
                        .map((data) => {
                        data.json();
                        return data.json();
                    });
                }
            };
            ProfileService = __decorate([
                core_5.Injectable(), 
                __metadata('design:paramtypes', [http_4.Http])
            ], ProfileService);
            exports_6("ProfileService", ProfileService);
        }
    }
});
System.register("services/commonapp.service", ['@angular/core', '@angular/http', 'rxjs/add/operator/map', "services/static-variable"], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var core_6, http_5, static_variable_4;
    var CommonAppService;
    return {
        setters:[
            function (core_6_1) {
                core_6 = core_6_1;
            },
            function (http_5_1) {
                http_5 = http_5_1;
            },
            function (_5) {},
            function (static_variable_4_1) {
                static_variable_4 = static_variable_4_1;
            }],
        execute: function() {
            CommonAppService = class CommonAppService {
                constructor(http) {
                    this.http = http;
                    console.log(' CommonService call');
                }
                mergeObjects(obj1, obj2, callback) {
                    var obj3 = {};
                    for (var attrname in obj1) {
                        obj3[attrname] = obj1[attrname];
                    }
                    for (var attrname in obj2) {
                        obj3[attrname] = obj2[attrname];
                    }
                    callback(obj3);
                }
                getFormattedAddress(place) {
                    let street_number = "", name = "", address = "", city = "", state = "", zip = "", country = "", formattedAddress = "";
                    for (let i = 0; i < place.address_components.length; i++) {
                        let addr = place.address_components[i];
                        if (addr.types[0] == 'street_number')
                            street_number = addr.short_name;
                        else if (addr.types[0] == 'country')
                            country = addr.long_name;
                        else if (addr.types[0] == 'street_address')
                            address = address + addr.long_name;
                        else if (addr.types[0] == 'establishment')
                            address = address + addr.long_name;
                        else if (addr.types[0] == 'route')
                            address = address + addr.long_name;
                        else if (addr.types[0] == 'postal_code')
                            zip = addr.short_name;
                        else if (addr.types[0] == ['administrative_area_level_1'])
                            state = addr.short_name;
                        else if (addr.types[0] == ['locality'])
                            city = addr.long_name;
                    }
                    if (place.name && place.name != "") {
                        name = place.name + ", ";
                    }
                    else if (street_number != "") {
                        name = street_number + ", ";
                    }
                    formattedAddress = name + address + ", " + city + ", " + state;
                    let array = formattedAddress.split(',');
                    let newArray = array.filter(function (v) { return v !== ''; });
                    if (address == '' && city == '') {
                        return "";
                    }
                    return formattedAddress;
                }
                getFormattedDate(date) {
                    let dt = new Date(date);
                    return (dt.getFullYear() + '-' + ('0' + (dt.getMonth() + 1)).slice(-2) + '-' + ('0' + dt.getDate()).slice(-2));
                }
                getDayDiffFromTwoDate(firstDate, secondDate) {
                    let dayDiff = (secondDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24);
                    return dayDiff;
                }
                sendEmail(emailUser) {
                    let body = JSON.stringify(emailUser);
                    let headers = new http_5.Headers({ 'Content-Type': 'application/json' });
                    let options = new http_5.RequestOptions({ headers: headers });
                    return this.http.post(static_variable_4.GlobalVariable.BASE_API_URL + static_variable_4.GlobalVariable.SEND_EMAIL, body, options)
                        .map((data) => {
                        data.json();
                        return data.json();
                    });
                }
                //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
                calDistance(lat1, lon1, lat2, lon2) {
                    let R = 6371; // km
                    let dLat = this.toRad(lat2 - lat1);
                    let dLon = this.toRad(lon2 - lon1);
                    let radlat1 = this.toRad(lat1);
                    let radlat2 = this.toRad(lat2);
                    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(radlat1) * Math.cos(radlat2);
                    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                    let d = R * c;
                    return d;
                }
                // Converts numeric degrees to radians
                toRad(Value) {
                    return Value * Math.PI / 180;
                }
                isUndefined(obj) {
                    if (typeof obj == 'undefined' || obj == null || obj == '') {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                getSelectedFromMultiselect(object) {
                    let array = [];
                    for (let key in object) {
                        console.log(' object ' + JSON.stringify(object[key]));
                        if (object[key].checked && object[key].checked == true) {
                            array.push(object[key].value);
                        }
                    }
                    return array;
                }
                getArrayFromString(object) {
                    let array = [];
                    // let items = object.slice(1, -1).split(',');
                    // console.log(' rentalItem.items ' + JSON.stringify(items));
                    // for (let k in items){
                    //     console.log(' items[k] ' + JSON.stringify(items[k]).replace(/['"]+/g, '').slice(1, -1));
                    //     array.push(JSON.stringify(items[k]).replace(/['"]+/g, '').slice(1, -1));
                    // }
                    return array;
                }
            };
            CommonAppService = __decorate([
                core_6.Injectable(), 
                __metadata('design:paramtypes', [http_5.Http])
            ], CommonAppService);
            exports_7("CommonAppService", CommonAppService);
        }
    }
});
System.register("services/upload-picture.service", ['@angular/core', '@angular/http', 'rxjs/Rx', 'rxjs/add/operator/map', "services/static-variable"], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var core_7, http_6, Rx_1, static_variable_5;
    var UploadPictureService;
    return {
        setters:[
            function (core_7_1) {
                core_7 = core_7_1;
            },
            function (http_6_1) {
                http_6 = http_6_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (_6) {},
            function (static_variable_5_1) {
                static_variable_5 = static_variable_5_1;
            }],
        execute: function() {
            //let FormData = require('../../../node_modules/form-data/lib/form_data.js');
            UploadPictureService = class UploadPictureService {
                constructor(http) {
                    this.http = http;
                }
                uploadPicture(file) {
                    //let body = {files: file};
                    // let formData = new FormData();
                    // formData.append("files", file);
                    // let xhr: XMLHttpRequest = new XMLHttpRequest();
                    // //let headers = new Headers({ 'Content-Type': 'application/json' });
                    // let headers = new Headers({ 'Content-Type': 'multipart/form-data' });
                    // let options = new RequestOptions({ headers: headers });
                    // xhr.open('POST', GlobalVariable.BASE_API_URL + GlobalVariable.UPLOAD_PICTURE, true);
                    // return xhr.send(formData).map((data: any) => {
                    //     console.log(' uploadPicture data : ' + JSON.stringify(data));
                    //     data.json();
                    //     return data.json();
                    // });
                    // return this.http.post(GlobalVariable.BASE_API_URL + GlobalVariable.UPLOAD_PICTURE, formData, options)
                    //     .map((data: any) => {
                    //         console.log(' uploadPicture data : ' + JSON.stringify(data));
                    //         data.json();
                    //         return data.json();
                    //     });
                    return Rx_1.Observable.fromPromise(new Promise((resolve, reject) => {
                        let formData = new FormData();
                        let xhr = new XMLHttpRequest();
                        formData.append("files", file, file.name);
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState === 4) {
                                if (xhr.status === 200) {
                                    resolve(JSON.parse(xhr.response));
                                }
                                else {
                                    reject(xhr.response);
                                }
                            }
                        };
                        xhr.open("POST", static_variable_5.GlobalVariable.BASE_API_URL + static_variable_5.GlobalVariable.UPLOAD_PICTURE, true);
                        xhr.send(formData);
                    }));
                }
            };
            UploadPictureService = __decorate([
                core_7.Injectable(), 
                __metadata('design:paramtypes', [http_6.Http])
            ], UploadPictureService);
            exports_8("UploadPictureService", UploadPictureService);
        }
    }
});
System.register("services/index", ["services/account.service", "services/user.service", "services/property.service", "services/profile.service", "services/commonapp.service", "services/upload-picture.service"], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_9(exports);
    }
    return {
        setters:[
            function (account_service_1_1) {
                exportStar_1(account_service_1_1);
            },
            function (user_service_1_1) {
                exportStar_1(user_service_1_1);
            },
            function (property_service_1_1) {
                exportStar_1(property_service_1_1);
            },
            function (profile_service_1_1) {
                exportStar_1(profile_service_1_1);
            },
            function (commonapp_service_1_1) {
                exportStar_1(commonapp_service_1_1);
            },
            function (upload_picture_service_1_1) {
                exportStar_1(upload_picture_service_1_1);
            }],
        execute: function() {
        }
    }
});
System.register("app.component", ['@angular/core'], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var core_8;
    var AppComponent;
    return {
        setters:[
            function (core_8_1) {
                core_8 = core_8_1;
            }],
        execute: function() {
            AppComponent = class AppComponent {
            };
            AppComponent = __decorate([
                core_8.Component({
                    selector: 'maprental-app',
                    template: `
	 	<navbar></navbar>
  		<router-outlet></router-outlet>
  	`,
                }), 
                __metadata('design:paramtypes', [])
            ], AppComponent);
            exports_10("AppComponent", AppComponent);
        }
    }
});
System.register("components/models/user", [], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var User;
    return {
        setters:[],
        execute: function() {
            User = class User {
            };
            exports_11("User", User);
        }
    }
});
System.register("components/auth/auth.component", ['@angular/core', '@angular/router', 'angular2-cool-storage'], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var core_9, router_1, angular2_cool_storage_1;
    var AuthComponent;
    return {
        setters:[
            function (core_9_1) {
                core_9 = core_9_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (angular2_cool_storage_1_1) {
                angular2_cool_storage_1 = angular2_cool_storage_1_1;
            }],
        execute: function() {
            AuthComponent = class AuthComponent {
                constructor(router, localStorage) {
                    this.router = router;
                    //this.cookieService = cookieService;  
                    this.localStorage = localStorage;
                }
                canActivate(route, state) {
                    this.currentUser = this.localStorage.getObject('currentUser');
                    if (this.currentUser) {
                        // logged in so return true
                        return true;
                    }
                    else {
                        //this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
                        return false;
                    }
                }
            };
            AuthComponent = __decorate([
                core_9.Injectable(), 
                __metadata('design:paramtypes', [router_1.Router, angular2_cool_storage_1.CoolLocalStorage])
            ], AuthComponent);
            exports_12("AuthComponent", AuthComponent);
        }
    }
});
System.register("components/popup-modals/loginModal.component", ['@angular/core', '@angular/router', '@angular/http', "services/index", 'angular2-cool-storage'], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var core_10, router_2, http_7, index_1, angular2_cool_storage_2;
    var LoginModalComponent;
    return {
        setters:[
            function (core_10_1) {
                core_10 = core_10_1;
            },
            function (router_2_1) {
                router_2 = router_2_1;
            },
            function (http_7_1) {
                http_7 = http_7_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (angular2_cool_storage_2_1) {
                angular2_cool_storage_2 = angular2_cool_storage_2_1;
            }],
        execute: function() {
            LoginModalComponent = class LoginModalComponent {
                constructor(route, router, accountService, http, localStorage, renderer) {
                    this.route = route;
                    this.router = router;
                    this.accountService = accountService;
                    this.http = http;
                    this.renderer = renderer;
                    this.visible = false;
                    this.visibleAnimate = false;
                    this.login_success_msg = '';
                    this.login_fail_msg = '';
                    this.localStorage = localStorage;
                    console.log(' constructor call ');
                }
                putCookie(key, value) {
                    console.log(' key ' + JSON.stringify(key));
                    console.log(' value ' + JSON.stringify(value));
                    this.localStorage.setObject(key, value);
                    //return this.cookieService.putObject(key, value);
                }
                ngOnInit() {
                    this.user = {
                        Id: 0,
                        email: '',
                        password: '',
                        confirmpassword: ''
                    };
                    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    this.router.navigateByUrl('/');
                }
                show() {
                    this.visible = true;
                    setTimeout(() => this.visibleAnimate = true);
                }
                hide() {
                    this.visibleAnimate = false;
                    setTimeout(() => this.visible = false, 300);
                }
                openModal(id) {
                    this.hide();
                    document.getElementById(id).click();
                }
                login(event, model, isValid) {
                    event.preventDefault();
                    console.log('model, isValid ' + model, isValid);
                    if (isValid) {
                        this.accountService.login(model.email, model.password)
                            .subscribe(data => {
                            console.log(' data ' + JSON.stringify(data));
                            if (data.Success == true) {
                                this.login_success_msg = 'Login Successfull';
                                this.login_fail_msg = '';
                                //this.putCookie('currentUser', data.Response);
                                this.localStorage.setObject('currentUser', data.Response);
                                this.renderer.invokeElementMethod(this.navbarbrand.nativeElement, 'click', []);
                            }
                            else {
                                this.login_fail_msg = data.Response;
                                this.login_success_msg = '';
                            }
                        }, error => {
                            console.log(' Error while login ' + JSON.stringify(error));
                            this.login_fail_msg = error.Response;
                            this.login_success_msg = '';
                        });
                    }
                }
            };
            __decorate([
                core_10.ViewChild('navbarbrand'), 
                __metadata('design:type', Object)
            ], LoginModalComponent.prototype, "navbarbrand", void 0);
            LoginModalComponent = __decorate([
                core_10.Component({
                    moduleId: module.id,
                    selector: 'lmodal',
                    templateUrl: 'loginModal.component.html',
                    providers: [angular2_cool_storage_2.CoolLocalStorage]
                }),
                __param(5, core_10.Inject(core_10.Renderer)), 
                __metadata('design:paramtypes', [router_2.ActivatedRoute, router_2.Router, index_1.AccountService, http_7.Http, angular2_cool_storage_2.CoolLocalStorage, core_10.Renderer])
            ], LoginModalComponent);
            exports_13("LoginModalComponent", LoginModalComponent);
        }
    }
});
System.register("components/popup-modals/registrationModal.component", ['@angular/core', '@angular/router', "services/index"], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var core_11, router_3, index_2;
    var MyAppModule, RegistrationModalComponent;
    return {
        setters:[
            function (core_11_1) {
                core_11 = core_11_1;
            },
            function (router_3_1) {
                router_3 = router_3_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            }],
        execute: function() {
            MyAppModule = class MyAppModule {
            };
            exports_14("MyAppModule", MyAppModule);
            RegistrationModalComponent = class RegistrationModalComponent {
                constructor(route, router, accountService) {
                    this.route = route;
                    this.router = router;
                    this.accountService = accountService;
                    this.visible = false;
                    this.visibleAnimate = false;
                    this.registration_success_msg = '';
                    this.registration_fail_msg = '';
                }
                ngOnInit() {
                    this.user = {
                        Id: 0,
                        email: '',
                        password: '',
                        confirmpassword: ''
                    };
                    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                }
                show() {
                    this.visible = true;
                    setTimeout(() => this.visibleAnimate = true);
                }
                hide() {
                    this.visibleAnimate = false;
                    setTimeout(() => this.visible = false, 300);
                }
                openModal(id) {
                    this.hide();
                    document.getElementById(id).click();
                }
                registration(event, model, isValid) {
                    console.log('model, isValid ' + JSON.stringify(model), isValid);
                    event.preventDefault();
                    console.log('model, isValid ' + model, isValid);
                    if (isValid) {
                        this.accountService.registration(model.email, model.password)
                            .subscribe(data => {
                            console.log(' data ' + JSON.stringify(data));
                            if (data.Success == true) {
                                this.registration_success_msg = data.Response;
                                this.registration_fail_msg = '';
                            }
                            else {
                                this.registration_fail_msg = data.Response;
                                this.registration_success_msg = '';
                            }
                            //this.router.navigate([this.returnUrl]);
                        }, error => {
                            console.log(' Error while registration : ' + JSON.stringify(error));
                            this.registration_fail_msg = error.Response;
                            this.registration_success_msg = '';
                        });
                    }
                }
            };
            RegistrationModalComponent = __decorate([
                core_11.Component({
                    moduleId: module.id,
                    selector: 'rmodal',
                    templateUrl: 'registrationModal.component.html',
                    providers: [index_2.UserService]
                }), 
                __metadata('design:paramtypes', [router_3.ActivatedRoute, router_3.Router, index_2.AccountService])
            ], RegistrationModalComponent);
            exports_14("RegistrationModalComponent", RegistrationModalComponent);
        }
    }
});
System.register("components/user/user.component", ['@angular/core'], function(exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var core_12;
    var UserComponent;
    return {
        setters:[
            function (core_12_1) {
                core_12 = core_12_1;
            }],
        execute: function() {
            UserComponent = class UserComponent {
            };
            UserComponent = __decorate([
                core_12.Component({
                    moduleId: module.id,
                    selector: 'user',
                    templateUrl: 'user.component.html'
                }), 
                __metadata('design:paramtypes', [])
            ], UserComponent);
            exports_15("UserComponent", UserComponent);
        }
    }
});
System.register("components/models/profile", [], function(exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var Profile;
    return {
        setters:[],
        execute: function() {
            Profile = class Profile {
            };
            exports_16("Profile", Profile);
        }
    }
});
System.register("components/profile/profile.component", ['@angular/core', '@angular/router', "services/index", 'angular2-cool-storage'], function(exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var core_13, router_4, index_3, angular2_cool_storage_3;
    var ProfileComponent;
    return {
        setters:[
            function (core_13_1) {
                core_13 = core_13_1;
            },
            function (router_4_1) {
                router_4 = router_4_1;
            },
            function (index_3_1) {
                index_3 = index_3_1;
            },
            function (angular2_cool_storage_3_1) {
                angular2_cool_storage_3 = angular2_cool_storage_3_1;
            }],
        execute: function() {
            ProfileComponent = class ProfileComponent {
                constructor(route, router, profileService, localStorage) {
                    this.route = route;
                    this.router = router;
                    this.profileService = profileService;
                    this.loading = false;
                    this._success_msg = '';
                    this._fail_msg = '';
                    this.localStorage = localStorage;
                }
                ngOnInit() {
                    this.initProfile();
                    this.currentUser = this.localStorage.getObject('currentUser');
                    console.log(' currentUser ' + JSON.stringify(this.currentUser));
                    if (typeof (this.currentUser) != "undefined" && this.currentUser.Id != null) {
                        this.loading = true;
                        this.profileService.getProfileById(this.currentUser.Id)
                            .subscribe((data) => {
                            console.log(' data ' + JSON.stringify(data));
                            this.profile = data;
                            this.loading = false;
                        }, (error) => {
                            console.log(' Error while getProfileById : ' + JSON.stringify(error));
                            this.loading = false;
                        });
                    }
                    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                }
                initProfile() {
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
                }
                updateProfile(event, model, isValid) {
                    event.preventDefault();
                    model.Id = this.profile.Id;
                    console.log('model ' + JSON.stringify(model));
                    console.log('this.profile ' + JSON.stringify(this.profile));
                    if (isValid) {
                        this.profileService.updateProfile(model)
                            .subscribe((data) => {
                            this.loading = false;
                            console.log(' data ' + JSON.stringify(data));
                            this._success_msg = "Profile Updated Successfully";
                            //this.router.navigate([this.returnUrl]);
                        }, (error) => {
                            this.loading = false;
                            this._fail_msg = "Fail to update Profile " + error;
                            console.log(' Error while updateProfile : ' + JSON.stringify(error));
                        });
                    }
                }
            };
            ProfileComponent = __decorate([
                core_13.Component({
                    moduleId: module.id,
                    selector: 'profile',
                    templateUrl: 'profile.component.html',
                    providers: [angular2_cool_storage_3.CoolLocalStorage]
                }), 
                __metadata('design:paramtypes', [router_4.ActivatedRoute, router_4.Router, index_3.ProfileService, angular2_cool_storage_3.CoolLocalStorage])
            ], ProfileComponent);
            exports_17("ProfileComponent", ProfileComponent);
        }
    }
});
System.register("components/myrentals/myrentals.component", ['@angular/core', '@angular/router', "services/index", 'angular2-cool-storage'], function(exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var core_14, router_5, index_4, angular2_cool_storage_4;
    var MyRentalsComponent;
    return {
        setters:[
            function (core_14_1) {
                core_14 = core_14_1;
            },
            function (router_5_1) {
                router_5 = router_5_1;
            },
            function (index_4_1) {
                index_4 = index_4_1;
            },
            function (angular2_cool_storage_4_1) {
                angular2_cool_storage_4 = angular2_cool_storage_4_1;
            }],
        execute: function() {
            MyRentalsComponent = class MyRentalsComponent {
                constructor(route, router, propertyService, commonAppService, localStorage) {
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
                ngOnInit() {
                    this.currentUser = this.localStorage.getObject('currentUser');
                    console.log(' currentUser ' + JSON.stringify(this.currentUser));
                    if (typeof (this.currentUser) != "undefined" && this.currentUser.Id != null) {
                        this.loading = true;
                        this.propertyService.getAllPropertiesByUserId(this.currentUser.Id)
                            .subscribe((data) => {
                            console.log(' data ' + JSON.stringify(data));
                            this.myrentals = data;
                            this.loading = false;
                        }, (error) => {
                            console.log(' Error while getProfileById : ' + JSON.stringify(error));
                            this.loading = false;
                        });
                    }
                    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                }
                editProperty(event, prop) {
                    event.stopPropagation();
                    if (!this.commonAppService.isUndefined(prop.Id)) {
                        this.router.navigate([
                            'manageProperty', { Id: prop.Id }
                        ]);
                    }
                }
                deleteProperty(event, prop) {
                    event.stopPropagation();
                    console.log(' deleteProperty ' + JSON.stringify(prop));
                    this.openModal('deleteAlertModalBtn');
                    this.activeDeactiveMsg = (prop.IsActive == true) ? "Deactivate instead! When unit is vacant again, log-in and re-activate it with 1-click." : "Your listing is already hidden from tenants.  Keep it saved for next time.";
                    this.isDeactiveBtn = (prop.IsActive == false) ? false : true;
                    this.prop = prop;
                }
                openModal(ButtonId) {
                    console.log(' ButtonId ' + ButtonId);
                    this.visible = true;
                    setTimeout(() => this.visibleAnimate = true);
                }
                hideModal() {
                    this.visibleAnimate = false;
                    setTimeout(() => this.visible = false, 300);
                }
                activeDeactiveProperty(prop) {
                    this.loading = true;
                    prop.IsActive = !prop.IsActive;
                    this.propertyService.activeDeactivePropertyById(prop.Id, prop.IsActive)
                        .subscribe((data) => {
                        console.log(' data ' + JSON.stringify(data));
                        this._success_msg = data;
                        this.loading = false;
                    }, (error) => {
                        console.log(' Error while activeDeactiveProperty : ' + JSON.stringify(error));
                        this._fail_msg = error;
                        this.loading = false;
                    });
                }
                deActivateProperty() {
                    console.log(' this.prop ' + JSON.stringify(this.prop));
                    if (!this.commonAppService.isUndefined(this.prop)) {
                        this.activeDeactiveProperty(this.prop);
                    }
                    this.hideModal();
                }
                setDeleteTrueProperty() {
                    console.log(' this.prop ' + JSON.stringify(this.prop));
                    this.loading = true;
                    if (!this.commonAppService.isUndefined(this.prop)) {
                        this.propertyService.deletePropertyById(this.prop.Id)
                            .subscribe((data) => {
                            console.log(' data ' + JSON.stringify(data));
                            this._success_msg = data;
                            this.loading = false;
                            this.myrentals.splice(this.myrentals.indexOf(this.prop), 1);
                        }, (error) => {
                            console.log(' Error while deleteProperty : ' + JSON.stringify(error));
                            this._fail_msg = error;
                            this.loading = false;
                        });
                    }
                    this.hideModal();
                }
            };
            MyRentalsComponent = __decorate([
                core_14.Component({
                    moduleId: module.id,
                    selector: 'myrentals',
                    templateUrl: 'myrentals.component.html',
                    providers: [angular2_cool_storage_4.CoolLocalStorage]
                }), 
                __metadata('design:paramtypes', [router_5.ActivatedRoute, router_5.Router, index_4.PropertyService, index_4.CommonAppService, angular2_cool_storage_4.CoolLocalStorage])
            ], MyRentalsComponent);
            exports_18("MyRentalsComponent", MyRentalsComponent);
        }
    }
});
System.register("components/map/map.component", ['@angular/core', "app.component", "angular2-google-maps/core"], function(exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var core_15, app_component_1, core_16;
    var MapComponent;
    return {
        setters:[
            function (core_15_1) {
                core_15 = core_15_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (core_16_1) {
                core_16 = core_16_1;
            }],
        execute: function() {
            MapComponent = class MapComponent {
                constructor(mapApiWrapper, _mapsAPILoader, _markerManager, ngZone, _infoWindowManager, _el, _renderer) {
                    this.mapApiWrapper = mapApiWrapper;
                    this._mapsAPILoader = _mapsAPILoader;
                    this._markerManager = _markerManager;
                    this.ngZone = ngZone;
                    this._infoWindowManager = _infoWindowManager;
                    this._el = _el;
                    this._renderer = _renderer;
                    /*------ map -------------*/
                    this._map = null;
                    this.mapChanged = new core_15.EventEmitter();
                    // this.zoom = 9;
                    //     this.latitude = 49.895136;
                    //     this.longitude = -97.13837439999998;.
                    //this._infoWindowManager = _infoWindowManager;
                }
                set map(val) {
                    this._map = val;
                    this.mapChanged.emit(val);
                }
                get map() {
                    return this._map;
                }
                ngOnInit() {
                    this.mapApiWrapper.getNativeMap()
                        .then((map) => {
                        this._map = map;
                        console.log('map.getZoom() ' + map.getZoom());
                        console.log('this._map 1111' + this._map);
                        this.currentmarker = new core_16.SebmGoogleMapMarker(this._markerManager);
                        this.currentmarker.iconUrl = 'assets/public/img/pin-purple.png';
                        this.currentmarker.latitude = 49.895136;
                        this.currentmarker.longitude = -97.13837439999998;
                        this._markerManager.addMarker(this.currentmarker);
                        console.log(' this.currentmarker ' + JSON.stringify(this.currentmarker));
                        // this._markerManager.returnMarkers().then((markers: any) => {
                        //     console.log(' markers ' + JSON.stringify(markers));
                        //     this._markerClusterer = new MarkerClusterer(this._map, markers);
                        // });
                    });
                    // this.content = this._el.nativeElement.querySelector('.sebm-google-map-info-window-content');
                }
                ngAfterViewInit() {
                    let THIS = this;
                    const baseAddEventListeners = core_16.SebmGoogleMapMarker.prototype._addEventListeners;
                    core_16.SebmGoogleMapMarker.prototype._addEventListeners = function () {
                        this._markerManager.createEventObservable('mouseover', this)
                            .subscribe((position) => {
                            console.log(' THIS.map ' + THIS.map + ' THIS.map.getCenter() ' + THIS.map.getCenter());
                            console.log(' position.latLng ' + JSON.stringify(position.latLng));
                            let projection = THIS.map.getProjection();
                            let center = projection.fromLatLngToPoint(THIS.map.getCenter()), point = projection.fromLatLngToPoint(position.latLng), quadrant = "", offset;
                            console.log('point ' + point);
                            quadrant += (point.y > center.y) ? "b" : "t";
                            quadrant += (point.x < center.x) ? "l" : "r";
                            if (quadrant == "tr") {
                                offset = new google.maps.Size(-140, 250);
                            }
                            else if (quadrant === "tl") {
                                //offset = new google.maps.Size(70, 185);
                                offset = new google.maps.Size(160, 250);
                            }
                            else if (quadrant === "br") {
                                offset = new google.maps.Size(-140, 25);
                            }
                            else if (quadrant === "bl") {
                                offset = new google.maps.Size(160, 25);
                            }
                            console.log(' offset ' + offset);
                            //this.infoWindow.setOptions({ pixelOffset: offset});
                            // console.log(' getPosition ' + this.infoWindow.getPosition());
                            //this.infoWindow.setOptions({ pixelOffset: offset});
                            // this.infoWindow.content = "<p>yeesdfdsf</p>";
                            // this.infoWindow.pixelOffset = offset;
                            THIS._infoWindowManager.setOptions(this.infoWindow, { pixelOffset: offset });
                            // this._markerManager.updateIcon();
                            // THIS._infoWindowManager.addInfoWindow(this.infoWindow);
                            this.infoWindow.open();
                        });
                        this._markerManager.createEventObservable('mouseout', this)
                            .subscribe(() => {
                            //this.infoWindow.close(); 
                        });
                        baseAddEventListeners.call(this);
                    };
                }
            };
            __decorate([
                core_15.Output('map'), 
                __metadata('design:type', core_15.EventEmitter)
            ], MapComponent.prototype, "mapChanged", void 0);
            __decorate([
                core_15.ViewChild('googleMap'), 
                __metadata('design:type', core_15.ElementRef)
            ], MapComponent.prototype, "googleMap", void 0);
            __decorate([
                core_15.ViewChild('infoWindow'), 
                __metadata('design:type', Object)
            ], MapComponent.prototype, "infoWindow", void 0);
            MapComponent = __decorate([
                core_15.Component({
                    selector: 'map-content',
                    styles: [`
        .sebm-google-map-container {
            height: 100%;
        }
    `],
                    template: ''
                }),
                core_15.NgModule({
                    imports: [core_16.MarkerManager, core_16.SebmGoogleMapMarker],
                    declarations: [app_component_1.AppComponent],
                    bootstrap: [app_component_1.AppComponent]
                }), 
                __metadata('design:paramtypes', [core_16.GoogleMapsAPIWrapper, core_16.MapsAPILoader, core_16.MarkerManager, core_15.NgZone, core_16.InfoWindowManager, core_15.ElementRef, core_15.Renderer])
            ], MapComponent);
            exports_19("MapComponent", MapComponent);
        }
    }
});
System.register("components/custom/multiselect/multiselect.component", ['@angular/core', 'rxjs/Rx', 'rxjs/add/operator/debounceTime', 'rxjs/add/operator/distinctUntilChanged', 'rxjs/add/operator/throttleTime', 'rxjs/add/observable/fromEvent', '@angular/forms'], function(exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var core_17, core_18, Rx_2, forms_2;
    var FilterPipe, Multiselect;
    return {
        setters:[
            function (core_17_1) {
                core_17 = core_17_1;
                core_18 = core_17_1;
            },
            function (Rx_2_1) {
                Rx_2 = Rx_2_1;
            },
            function (_7) {},
            function (_8) {},
            function (_9) {},
            function (_10) {},
            function (forms_2_1) {
                forms_2 = forms_2_1;
            }],
        execute: function() {
            FilterPipe = class FilterPipe {
                transform(items, filter) {
                    if (filter && Array.isArray(items)) {
                        let filterKeys = Object.keys(filter);
                        return items.filter(item => filterKeys.reduce((memo, keyName) => (memo && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] === "", true));
                    }
                    else {
                        return items;
                    }
                }
            };
            FilterPipe = __decorate([
                core_18.Pipe({
                    name: 'filter'
                }), 
                __metadata('design:paramtypes', [])
            ], FilterPipe);
            exports_20("FilterPipe", FilterPipe);
            Multiselect = class Multiselect {
                constructor(changeDetectorRef) {
                    this.changeDetectorRef = changeDetectorRef;
                    this.isOpen = false;
                    this._header = "Select value";
                    this.filterInput = new forms_2.FormControl();
                    // ControlValueAccessor Intercace and mutator
                    this.propagateChange = (_) => { };
                }
                get selectedItems() {
                    return this._selectedItems;
                }
                ;
                writeValue(value) {
                    if (value !== undefined) {
                        this._selectedItems = value;
                    }
                    else {
                        this._selectedItems = [];
                    }
                }
                registerOnChange(fn) {
                    this.propagateChange = fn;
                }
                select(item) {
                    item.checked = !item.checked;
                }
                toggleSelect() {
                    console.log(' toggleSelect call');
                    this.isOpen = !this.isOpen;
                }
                openSelect() {
                    this.isOpen = true;
                }
                closeSelect() {
                    this.isOpen = false;
                }
                clearFilter() {
                    this.filterText = "";
                }
                ngOnInit() {
                    this._subscription = this.items.subscribe(res => this._items = res);
                    if (this._items[0].label == "Apartment") {
                        this._header = "Property Types";
                    }
                    else if (this._items[0].label == "Studio") {
                        this._header = "Beds";
                    }
                    this.enableFilter = false;
                    this.filterText = "";
                    this.filterPlaceholder = "Filter..";
                    this.filterInput
                        .valueChanges
                        .debounceTime(200)
                        .distinctUntilChanged()
                        .subscribe(term => {
                        this.filterText = term;
                        this.changeDetectorRef.markForCheck();
                        console.log(term);
                    });
                }
            };
            __decorate([
                core_17.Input(), 
                __metadata('design:type', Rx_2.Observable)
            ], Multiselect.prototype, "items", void 0);
            __decorate([
                core_17.Input(), 
                __metadata('design:type', Rx_2.Observable)
            ], Multiselect.prototype, "header", void 0);
            Multiselect = __decorate([
                core_17.Component({
                    moduleId: module.id,
                    selector: 'multiselect',
                    templateUrl: './multiselect.component.html'
                }), 
                __metadata('design:paramtypes', [core_17.ChangeDetectorRef])
            ], Multiselect);
            exports_20("Multiselect", Multiselect);
        }
    }
});
System.register("services/global", [], function(exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var redIconUrl, purpleIconUrl, greenIconUrl;
    return {
        setters:[],
        execute: function() {
            exports_21("redIconUrl", redIconUrl = "assets/public/img/pin-red.png");
            exports_21("purpleIconUrl", purpleIconUrl = "assets/public/img/pin-purple.png");
            exports_21("greenIconUrl", greenIconUrl = "assets/public/img/pin-green.png");
        }
    }
});
System.register("components/home/home.component", ['@angular/core', '@angular/platform-browser', '@angular/forms', 'rxjs/Rx', '@angular/router', "services/index", "app.component", "components/map/map.component", "components/custom/multiselect/multiselect.component", "angular2-google-maps/core"], function(exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var core_19, platform_browser_1, forms_3, Rx_3, router_6, index_5, app_component_2, map_component_1, multiselect_component_1, core_20;
    var iconUrl, HomeComponent;
    return {
        setters:[
            function (core_19_1) {
                core_19 = core_19_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (forms_3_1) {
                forms_3 = forms_3_1;
            },
            function (Rx_3_1) {
                Rx_3 = Rx_3_1;
            },
            function (router_6_1) {
                router_6 = router_6_1;
            },
            function (index_5_1) {
                index_5 = index_5_1;
            },
            function (app_component_2_1) {
                app_component_2 = app_component_2_1;
            },
            function (map_component_1_1) {
                map_component_1 = map_component_1_1;
            },
            function (multiselect_component_1_1) {
                multiselect_component_1 = multiselect_component_1_1;
            },
            function (core_20_1) {
                core_20 = core_20_1;
            }],
        execute: function() {
            exports_22("iconUrl", iconUrl = "assets/public/img/pin-purple.png");
            HomeComponent = class HomeComponent {
                constructor(route, router, renderer, accountService, propertyService, commonAppService, mapApiWrapper, _markerManager, _infoWindowManager, mapsAPILoader, multiselect, ngZone) {
                    this.route = route;
                    this.router = router;
                    this.renderer = renderer;
                    this.accountService = accountService;
                    this.propertyService = propertyService;
                    this.commonAppService = commonAppService;
                    this.mapApiWrapper = mapApiWrapper;
                    this._markerManager = _markerManager;
                    this._infoWindowManager = _infoWindowManager;
                    this.mapsAPILoader = mapsAPILoader;
                    this.multiselect = multiselect;
                    this.ngZone = ngZone;
                    this.properties = [];
                    this.allFullProperties = [];
                    this.loading = false;
                    /*------ map -------------*/
                    this._map = null;
                    this.mapChanged = new core_19.EventEmitter();
                    this.isBoundJustChanged = false;
                    this.isInfowindowOpen = false;
                    this.limitListingCount = 300;
                    this.markers = [];
                    this.currentIconUrl = iconUrl;
                    this._selectedItems = [];
                    this.moreFilterText = "More";
                    this.isMoreFilter = true;
                    this.valuedate = "";
                    this.ListedWithin = "";
                    this.Bath = [];
                    this.Pet = [];
                    this.Smoking = "";
                    this._beds = [];
                    this._propertyTypeItems = [];
                    this.beds = Rx_3.Observable.of(this._beds);
                    this.beds.subscribe(res => {
                        this.watchedBedsItems = res;
                    });
                    this.propertyTypeItems = Rx_3.Observable.of(this._propertyTypeItems);
                    this.propertyTypeItems.subscribe(res => {
                        this.watchedPropertyTypeItems = res;
                    });
                    this.initFilterQueryObject();
                }
                set map(val) {
                    this._map = val;
                    this.mapChanged.emit(val);
                }
                get map() {
                    return this._map;
                }
                initFilterQueryObject() {
                    this.filterQueryObject = {
                        PropertyType: [],
                        Min: "",
                        Max: "",
                        Bed: [],
                        Bath: [],
                        Keywords: "",
                        Pet: [],
                        Smoking: "",
                        ListedWithin: "",
                        DateAvailable: ""
                    };
                }
                ngOnInit() {
                    this.loading = true;
                    this.currentIconUrl = iconUrl;
                    this._beds.push({ label: "Studio", value: "Studio" });
                    this._beds.push({ label: "1", value: "1" });
                    this._beds.push({ label: "2", value: "2" });
                    this._beds.push({ label: "3", value: "3" });
                    this._beds.push({ label: "4", value: "4" });
                    this._beds.push({ label: "5+", value: "5+" });
                    this._propertyTypeItems.push({ label: "Apartment", value: "Apartment" });
                    this._propertyTypeItems.push({ label: "House", value: "House" });
                    this._propertyTypeItems.push({ label: "Room", value: "Room" });
                    this._propertyTypeItems.push({ label: "Other", value: "Other" });
                    //set google maps defaults
                    this.zoom = 9;
                    this.latitude = 49.895136;
                    this.longitude = -97.13837439999998;
                    // this.callGetPropertiesByLatLng(this.latitude, this.longitude);
                    //create search FormControl
                    this.searchControl = new forms_3.FormControl();
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
                                let place = autocomplete.getPlace();
                                //verify result
                                if (place.geometry === undefined || place.geometry === null) {
                                    return;
                                }
                                //set latitude, longitude and zoom
                                this.latitude = place.geometry.location.lat();
                                this.longitude = place.geometry.location.lng();
                                this.zoom = 12;
                            });
                        });
                    });
                }
                ngAfterViewInit() {
                    // const baseAddEventListeners = (<any>SebmGoogleMapMarker.prototype)._addEventListeners;
                    // (<any>SebmGoogleMapMarker.prototype)._addEventListeners = function() {
                    //     this._markerManager.createEventObservable('mouseover', this)
                    //     .subscribe(() => {
                    //         this.infoWindow.open();  
                    //         this.currentIconUrl = 'assets/public/img/pin-red.png';
                    //         this.isInfowindowOpen = true;
                    //         console.log(' this.isInfowindowOpen ' + this.isInfowindowOpen);
                    //     });
                    //     this._markerManager.createEventObservable('mouseout', this)
                    //      .subscribe(() => { 
                    //         //this.infoWindow.close(); 
                    //         //this.isInfowindowOpen = false;
                    //         this.currentIconUrl = 'assets/public/img/pin-purple.png';
                    //     });
                    //     baseAddEventListeners.call(this);
                    // }
                }
                callGetPropertiesByLatLng(lat, lng) {
                    console.log(' lat ' + lat);
                    console.log(' lng ' + lng);
                    let lat1 = -97.54947669492185;
                    let lat2 = 49.27930675988785;
                    let lng1 = -97.7272721050781;
                    let lng2 = 49.50788227657228;
                    if (!this.commonAppService.isUndefined(this.currentBounds)) {
                        lat1 = this.currentBounds.getNorthEast().lng();
                        lat2 = this.currentBounds.getNorthEast().lat();
                        lng1 = this.currentBounds.getSouthWest().lng();
                        lng2 = this.currentBounds.getSouthWest().lat();
                    }
                    // this.propertyService.getAllProperties()
                    this.propertyService.getAllPropertiesByGeoLatLong(lat, lng, this.limitListingCount)
                        .subscribe((data) => {
                        this.loading = false;
                        console.log(' 111data.filter(value => ()).length ' + JSON.stringify(data.length));
                        this.allFullProperties = [];
                        data.map((property, index) => {
                            if (property && this.checkMarkerVisible(property.Latitude, property.Longitude) && property.Id != "0" && index < this.limitListingCount && property.Pictures.length > 0) {
                                this.allFullProperties.push(property);
                            }
                        });
                        console.log(' 1111this.allFullProperties.length ' + JSON.stringify(this.allFullProperties.length));
                        this.filterListing(data);
                    }, (error) => {
                        this.loading = false;
                        console.log(' Error while  getAllPropertiesByLatLong : ' + JSON.stringify(error));
                    });
                }
                editProperty(event, Id) {
                    event.stopPropagation();
                    this.router.navigate([
                        'manageProperty', { Id: Id }
                    ]);
                }
                propertyDetails(event, Id) {
                    event.stopPropagation();
                    this.router.navigate([
                        'propertyDetails', { Id: Id }
                    ]);
                }
                toggleMore() {
                    this.isMoreFilter = !this.isMoreFilter;
                    this.moreFilterText = (this.isMoreFilter) ? "More" : "Less";
                }
                closeInforwindow() {
                    this.infoWindow.close();
                }
                updateResultCounter() {
                    this.resultCounter = this.properties.filter(value => (value.PicUrl != '' && (this.checkMarkerVisible(value.Latitude, value.Longitude)))).length;
                }
                /*------ Filter Property ------- */
                propTypeSelected(event, filterQueryObject) {
                    let propertyTypeItems = this.commonAppService.getSelectedFromMultiselect(this.watchedPropertyTypeItems);
                    this.filterQueryObject.PropertyType = propertyTypeItems;
                    this.filterListing(this.allFullProperties);
                }
                propMinChange(value) {
                    if (value != this.filterQueryObject.Min) {
                        this.filterQueryObject.Min = value;
                        this.filterListing(this.allFullProperties);
                    }
                }
                propMaxChange(value) {
                    if (value != this.filterQueryObject.Max) {
                        this.filterQueryObject.Max = value;
                        this.filterListing(this.allFullProperties);
                    }
                }
                propBedSelected(event, filterQueryObject) {
                    let propertyBedItems = this.commonAppService.getSelectedFromMultiselect(this.watchedBedsItems);
                    this.filterQueryObject.Bed = propertyBedItems;
                    this.filterListing(this.allFullProperties);
                }
                propAvailableDateChange() {
                    let selectedDate = $('#AvailableBefore').val();
                    this.filterQueryObject.DateAvailable = selectedDate;
                    this.filterListing(this.allFullProperties);
                }
                propKeywordsChange(value) {
                    if (value.length > 3 || value.length == 0) {
                        this.filterQueryObject.Keywords = value;
                        this.filterListing(this.allFullProperties);
                    }
                }
                propListedWithinChange(event) {
                    console.log(' propListedWithinChange event.target.value ' + event.target.value);
                    $('input[type=checkbox][name=listedWithin].listedWithin').each(function () {
                        if ($(this).data('val') != event.target.value) {
                            $(this).prop("checked", false);
                        }
                    });
                    this.ListedWithin = (event.target.checked == true) ? event.target.value : "";
                    this.filterQueryObject.ListedWithin = this.ListedWithin;
                    this.filterListing(this.allFullProperties);
                }
                propBathChange(event) {
                    if (event.target.checked == true) {
                        this.Bath.push(event.target.value);
                    }
                    else {
                        this.Bath.splice(this.Bath.indexOf(event.target.value), 1);
                    }
                    this.filterQueryObject.Bath = this.Bath;
                    this.filterListing(this.allFullProperties);
                }
                propPetChange(event) {
                    if (event.target.checked == true) {
                        this.Pet.push(event.target.value);
                    }
                    else {
                        this.Pet.splice(this.Pet.indexOf(event.target.value), 1);
                    }
                    console.log(' this.Pet ' + JSON.stringify(this.Pet));
                    this.filterQueryObject.Pet = this.Pet;
                    this.filterListing(this.allFullProperties);
                }
                propSmokingChange(event) {
                    $('input[type=checkbox][name=smoking].smoking').each(function () {
                        if ($(this).data('val') != event.target.value) {
                            $(this).prop("checked", false);
                        }
                    });
                    this.Smoking = (event.target.checked == true) ? event.target.value : "";
                    this.filterQueryObject.Smoking = this.Smoking;
                    this.filterListing(this.allFullProperties);
                }
                filterListing(data) {
                    console.log(' this.filterQueryObject ' + JSON.stringify(this.filterQueryObject));
                    // let filteredListing = Object.assign([], this.allFullProperties);
                    let filteredListing = [];
                    this.allFullProperties.map((property) => {
                        if (property && property.Id != 0) {
                            filteredListing.push(property);
                        }
                    });
                    console.log(' filteredListing ' + JSON.stringify(filteredListing.length));
                    for (let key in data) {
                        if (data.hasOwnProperty(key)) {
                            let rentalItem = data[key];
                            let dataKey = key;
                            for (let filterkey in this.filterQueryObject) {
                                if (this.filterQueryObject.hasOwnProperty(filterkey)) {
                                    if (filterkey == 'PropertyType') {
                                        let propertyTypeValue = this.filterQueryObject[filterkey];
                                        if (propertyTypeValue.length == 1 && propertyTypeValue.indexOf('Other') != -1) {
                                            if (propertyTypeValue.length == 1 && propertyTypeValue.indexOf('Other') != -1) {
                                                if (rentalItem.propertyType == 'Apartment' || rentalItem.propertyType == 'House' || rentalItem.propertyType == 'Room') {
                                                    filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                                }
                                            }
                                        }
                                        else if (propertyTypeValue.length > 0 && (!this.commonAppService.isUndefined(rentalItem.PropertyType)) && propertyTypeValue.indexOf('Other') != -1 && propertyTypeValue.indexOf(rentalItem.PropertyType) == -1) {
                                            if (rentalItem.PropertyType == 'Apartment' && propertyTypeValue.indexOf('Apartment') == -1) {
                                                filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                            }
                                            if (rentalItem.PropertyType == 'House' && propertyTypeValue.indexOf('House') == -1) {
                                                filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                            }
                                            if (rentalItem.PropertyType == 'Room' && propertyTypeValue.indexOf('Room') == -1) {
                                                filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                            }
                                        }
                                        else if (propertyTypeValue.length > 0 && !this.commonAppService.isUndefined(rentalItem.PropertyType) && propertyTypeValue.indexOf(rentalItem.PropertyType) == -1) {
                                            filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                        }
                                    }
                                    if (filterkey == 'Min') {
                                        let minValue = this.filterQueryObject[filterkey];
                                        if (minValue != '' && (!this.commonAppService.isUndefined(rentalItem.MonthlyRent)) && parseInt(minValue) >= parseInt(rentalItem.MonthlyRent)) {
                                            filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                        }
                                    }
                                    if (filterkey == 'Max') {
                                        let maxValue = this.filterQueryObject[filterkey];
                                        if (maxValue != '' && (!this.commonAppService.isUndefined(rentalItem.MonthlyRent)) && parseInt(maxValue) < parseInt(rentalItem.MonthlyRent)) {
                                            filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                        }
                                    }
                                    if (filterkey == 'Bed') {
                                        var bedsValue = this.filterQueryObject[filterkey];
                                        if (bedsValue.length > 0 && !this.commonAppService.isUndefined(rentalItem.Bed)) {
                                            if (bedsValue.indexOf(rentalItem.Bed) == -1 && rentalItem.Bed < 5) {
                                                filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                            }
                                            if (bedsValue.indexOf('Studio') == -1 && (rentalItem.Bed == 'Studio')) {
                                                filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                            }
                                            if (bedsValue.indexOf('5+') == -1 && rentalItem.Bed >= 5) {
                                                filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                            }
                                        }
                                    }
                                    if (filterkey == 'DateAvailable') {
                                        let dateAvailableValue = this.filterQueryObject[filterkey];
                                        if (this.commonAppService.isUndefined(dateAvailableValue)) {
                                        }
                                        else if (!this.commonAppService.isUndefined(dateAvailableValue) && (this.commonAppService.isUndefined(rentalItem.DateAvailable)) || rentalItem.IsImmediateAvailable == true) {
                                            filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                        }
                                        else if (!this.commonAppService.isUndefined(dateAvailableValue) && (!this.commonAppService.isUndefined(rentalItem.DateAvailable))) {
                                            filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                        }
                                    }
                                    if (filterkey == 'Keywords') {
                                        let keywords = this.filterQueryObject[filterkey];
                                        if (keywords != '' && (this.commonAppService.isUndefined(rentalItem.Title))) {
                                            delete filteredListing[dataKey];
                                        }
                                        else if (keywords != '' && (!this.commonAppService.isUndefined(rentalItem.Title)) && (rentalItem.Title.toLowerCase().indexOf(keywords.toLowerCase()) < 0)) {
                                            filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                        }
                                    }
                                    if (filterkey == 'ListedWithin') {
                                        let listedWithinValue = this.filterQueryObject[filterkey];
                                        let thisDateCreated = rentalItem.DateCreated;
                                        // 
                                        let DAYDIFF = this.commonAppService.getDayDiffFromTwoDate(new Date(thisDateCreated), new Date());
                                        if (listedWithinValue != '' && this.commonAppService.isUndefined(thisDateCreated)) {
                                            filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                        }
                                        else if (listedWithinValue.length != '' && !this.commonAppService.isUndefined(thisDateCreated)) {
                                            if (listedWithinValue == 'Month' && DAYDIFF > 30) {
                                                filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                            }
                                            else if (listedWithinValue == 'Week' && DAYDIFF > 7) {
                                                filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                            }
                                            else if (listedWithinValue == '48h' && DAYDIFF > 2) {
                                                filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                            }
                                        }
                                    }
                                    if (filterkey == 'Bath') {
                                        var bathsValue = this.filterQueryObject[filterkey];
                                        var bathsNumber = parseFloat(rentalItem.Bath);
                                        if (bathsValue.length >= 3 && !this.commonAppService.isUndefined(bathsNumber)) {
                                        }
                                        else if (bathsValue.length == 2 && !this.commonAppService.isUndefined(bathsNumber)) {
                                            if (bathsValue.indexOf('1') == -1 && bathsNumber <= 1) {
                                                filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                            }
                                            else if (bathsValue.indexOf('2') == -1 && (bathsNumber > 1 || bathsNumber <= 2)) {
                                                filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                            }
                                            else if (bathsValue.indexOf('3+') == -1 && bathsNumber > 2) {
                                                filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                            }
                                        }
                                        else if (bathsValue.length == 1 && !this.commonAppService.isUndefined(bathsNumber)) {
                                            if (bathsValue.indexOf('1') != -1 && bathsNumber > 1) {
                                                filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                            }
                                            else if (bathsValue.indexOf('2') != -1 && (bathsNumber <= 1 || bathsNumber > 2)) {
                                                filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                            }
                                            else if (bathsValue.indexOf('3+') != -1 && bathsNumber <= 2) {
                                                filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                            }
                                        }
                                    }
                                    if (filterkey == 'Pet') {
                                        var petsValue = this.filterQueryObject[filterkey];
                                        if (petsValue.length > 0 && !this.commonAppService.isUndefined(rentalItem.Pet) && petsValue.indexOf(rentalItem.Pet) == -1) {
                                            filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                        }
                                    }
                                    if (filterkey == 'Smoking') {
                                        let smokingValue = this.filterQueryObject[filterkey];
                                        if (smokingValue != '' && ((rentalItem.Smoking == true && smokingValue == 'Yes') || (rentalItem.Smoking == false && smokingValue == 'No'))) {
                                            filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    console.log(' filteredListing ' + JSON.stringify(filteredListing.length));
                    console.log(' this.allFullProperties.length ' + JSON.stringify(this.allFullProperties.length));
                    this.properties = Object.assign([], filteredListing);
                    this.markers = [];
                    this.properties.map((property) => {
                        if (property && property.Id != 0) {
                            // console.log(' property ' + JSON.stringify(property));
                            this.markers.push({
                                Latitude: property.Latitude,
                                Longitude: property.Longitude,
                                Id: property.Id + "",
                                PicUrl: property.Pictures[0].Url,
                                Bed: property.Bed,
                                MonthlyRent: property.MonthlyRent,
                                PropertyType: property.PropertyType,
                                draggable: false
                            });
                        }
                    });
                    console.log(' this.properties ' + JSON.stringify(this.properties.length));
                    console.log(' this.markers ' + JSON.stringify(this.markers.length));
                    this.resultCounter = filteredListing.length;
                    //this.updateResultCounter();
                }
                mapClicked(event, infoWindow) {
                    //infoWindow.close();
                    if (this.markers.length > 0) {
                        $('.gm-style-iw').next('div').find('img').click();
                    }
                }
                markerHover(index, infoWindow, marker) {
                    console.log(' displayUserMapInfo ' + index);
                    $('.gm-style-iw').next('div').find('img').click();
                }
                mapBoundsChanged(bounds) {
                    if (!this.commonAppService.isUndefined(bounds)) {
                        if (!this.commonAppService.isUndefined(bounds) && !this.commonAppService.isUndefined(this.centerBounds)) {
                        }
                        let center = bounds.getCenter();
                        this.currentBounds = bounds;
                        this.centerBounds = center;
                        let lat = center.lat();
                        let lng = center.lng();
                        if (this.isBoundJustChanged == false) {
                            this.isBoundJustChanged = true;
                        }
                    }
                }
                mapIdle(event, infoWindow) {
                    let lat = this.centerBounds.lat();
                    let lng = this.centerBounds.lng();
                    this.callGetPropertiesByLatLng(lat, lng);
                }
                mapCenterChanged(event) {
                    // console.log(' this.isInfowindowOpen ' + this.isInfowindowOpen );
                    // if(this.isInfowindowOpen == false){
                    //     console.log(' mapCenterChanged call zoom ' + this.zoom);
                    //     let lat = this.centerBounds.lat();
                    //     let lng = this.centerBounds.lng();
                    //     //this.callGetPropertiesByLatLng(lat, lng);
                    // }
                }
                mapZoomChange(zoom) {
                    console.log(' mapZoomChange ' + zoom);
                    this.zoom = zoom;
                    this.limitListingCountUpdate(this.zoom);
                    let lat = this.centerBounds.lat();
                    let lng = this.centerBounds.lng();
                    //this.callGetPropertiesByLatLng(lat, lng);
                }
                checkMarkerVisible(lat, lng) {
                    let lat1 = this.currentBounds.getSouthWest().lat();
                    let lng1 = this.currentBounds.getSouthWest().lng();
                    let lat2 = this.currentBounds.getNorthEast().lat();
                    let lng2 = this.currentBounds.getNorthEast().lng();
                    if ((lat >= lat1 && lat <= lat2) && (lng >= lng1 && lng <= lng2)) {
                        // return this.currentBounds.contains({'lat': lat, 'lng': lng});
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                limitListingCountUpdate(currentZoom) {
                    if (currentZoom <= 5) {
                        this.limitListingCount = 120;
                    }
                    else if (currentZoom > 5 && currentZoom <= 8) {
                        this.limitListingCount = 150;
                    }
                    else if (currentZoom > 8 && currentZoom <= 12) {
                        this.limitListingCount = 200;
                    }
                    else if (currentZoom > 12 && currentZoom <= 15) {
                        this.limitListingCount = 230;
                    }
                    else if (currentZoom > 15 && currentZoom <= 20) {
                        this.limitListingCount = 250;
                    }
                    else if (currentZoom > 20) {
                        this.limitListingCount = 350;
                    }
                }
                onResize(event) {
                    console.log('event.target.innerWidth ' + event.target.innerWidth);
                    console.log('event.target.innerHeight ' + event.target.innerHeight);
                    this.windowHeight = (event.target.innerHeight - 145) + 'px';
                    $("#rentalsItems").css("height", this.windowHeight);
                    $("#searchPropertyListing").css("height", this.windowHeight);
                    $("#googleMap").css("height", this.windowHeight);
                }
                isNumberKey(event) {
                    const pattern = /[0-9\+\-\ ]/;
                    let inputChar = String.fromCharCode(event.charCode);
                    if (!pattern.test(inputChar)) {
                        event.preventDefault();
                    }
                }
            };
            __decorate([
                core_19.Output('map'), 
                __metadata('design:type', core_19.EventEmitter)
            ], HomeComponent.prototype, "mapChanged", void 0);
            __decorate([
                core_19.ViewChild('googleMap'), 
                __metadata('design:type', core_19.ElementRef)
            ], HomeComponent.prototype, "googleMap", void 0);
            __decorate([
                core_19.ViewChild("SearchTop"), 
                __metadata('design:type', core_19.ElementRef)
            ], HomeComponent.prototype, "searchElementRef", void 0);
            __decorate([
                core_19.ViewChild('infoWindow'), 
                __metadata('design:type', Object)
            ], HomeComponent.prototype, "infoWindow", void 0);
            HomeComponent = __decorate([
                core_19.Component({
                    moduleId: module.id,
                    selector: 'home',
                    styles: [`
        .sebm-google-map-container {
            height: 100%;
        }
    `],
                    providers: [core_20.GoogleMapsAPIWrapper, core_20.MarkerManager, multiselect_component_1.Multiselect, map_component_1.MapComponent, core_20.InfoWindowManager],
                    templateUrl: 'home.component.html'
                }),
                core_19.NgModule({
                    imports: [platform_browser_1.BrowserModule, forms_3.FormsModule, core_20.MarkerManager, core_20.SebmGoogleMapMarker],
                    declarations: [app_component_2.AppComponent],
                    bootstrap: [app_component_2.AppComponent]
                }), 
                __metadata('design:paramtypes', [router_6.ActivatedRoute, router_6.Router, core_19.Renderer, index_5.AccountService, index_5.PropertyService, index_5.CommonAppService, core_20.GoogleMapsAPIWrapper, core_20.MarkerManager, core_20.InfoWindowManager, core_20.MapsAPILoader, multiselect_component_1.Multiselect, core_19.NgZone])
            ], HomeComponent);
            exports_22("HomeComponent", HomeComponent);
        }
    }
});
System.register("components/about/about.component", ['@angular/core'], function(exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var core_21;
    var AboutComponent;
    return {
        setters:[
            function (core_21_1) {
                core_21 = core_21_1;
            }],
        execute: function() {
            AboutComponent = class AboutComponent {
            };
            AboutComponent = __decorate([
                core_21.Component({
                    moduleId: module.id,
                    selector: 'about',
                    templateUrl: 'about.component.html'
                }), 
                __metadata('design:paramtypes', [])
            ], AboutComponent);
            exports_23("AboutComponent", AboutComponent);
        }
    }
});
System.register("components/contact/contact.component", ['@angular/core'], function(exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    var core_22;
    var ContactComponent;
    return {
        setters:[
            function (core_22_1) {
                core_22 = core_22_1;
            }],
        execute: function() {
            ContactComponent = class ContactComponent {
            };
            ContactComponent = __decorate([
                core_22.Component({
                    moduleId: module.id,
                    selector: 'about',
                    templateUrl: 'contact.component.html'
                }), 
                __metadata('design:paramtypes', [])
            ], ContactComponent);
            exports_24("ContactComponent", ContactComponent);
        }
    }
});
System.register("components/navbar/navbar.metadata", [], function(exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    var MenuType;
    return {
        setters:[],
        execute: function() {
            (function (MenuType) {
                MenuType[MenuType["BRAND"] = 0] = "BRAND";
                MenuType[MenuType["UNAUTH"] = 1] = "UNAUTH";
                MenuType[MenuType["AUTH"] = 2] = "AUTH";
            })(MenuType || (MenuType = {}));
            exports_25("MenuType", MenuType);
        }
    }
});
System.register("components/navbar/navbar-routes.config", ["components/navbar/navbar.metadata"], function(exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
    var navbar_metadata_1;
    var ROUTES;
    return {
        setters:[
            function (navbar_metadata_1_1) {
                navbar_metadata_1 = navbar_metadata_1_1;
            }],
        execute: function() {
            exports_26("ROUTES", ROUTES = [
                { path: '', title: 'Maprentals', menuType: navbar_metadata_1.MenuType.BRAND },
                { path: 'contact', title: 'Contact', menuType: navbar_metadata_1.MenuType.UNAUTH },
                { path: 'about', title: 'About Us', menuType: navbar_metadata_1.MenuType.UNAUTH },
                { path: 'profile', title: 'My Profile', menuType: navbar_metadata_1.MenuType.AUTH },
                { path: 'myrentals', title: 'My Rentals', menuType: navbar_metadata_1.MenuType.AUTH }
            ]);
        }
    }
});
System.register("components/navbar/navbar.component", ['@angular/core', '@angular/router', "components/navbar/navbar-routes.config", "components/navbar/navbar.metadata", "components/popup-modals/loginModal.component", "services/index", 'angular2-cool-storage'], function(exports_27, context_27) {
    "use strict";
    var __moduleName = context_27 && context_27.id;
    var core_23, router_7, navbar_routes_config_1, navbar_metadata_2, loginModal_component_1, index_6, angular2_cool_storage_5;
    var NavbarComponent;
    return {
        setters:[
            function (core_23_1) {
                core_23 = core_23_1;
            },
            function (router_7_1) {
                router_7 = router_7_1;
            },
            function (navbar_routes_config_1_1) {
                navbar_routes_config_1 = navbar_routes_config_1_1;
            },
            function (navbar_metadata_2_1) {
                navbar_metadata_2 = navbar_metadata_2_1;
            },
            function (loginModal_component_1_1) {
                loginModal_component_1 = loginModal_component_1_1;
            },
            function (index_6_1) {
                index_6 = index_6_1;
            },
            function (angular2_cool_storage_5_1) {
                angular2_cool_storage_5 = angular2_cool_storage_5_1;
            }],
        execute: function() {
            NavbarComponent = class NavbarComponent {
                //router : Router;
                constructor(localStorage, router, renderer, accountService, commonAppService) {
                    this.router = router;
                    this.renderer = renderer;
                    this.accountService = accountService;
                    this.commonAppService = commonAppService;
                    this.isCollapsed = true;
                    this.users = [];
                    this.localStorage = localStorage;
                }
                ngOnInit() {
                    this.menuItems = navbar_routes_config_1.ROUTES.filter(menuItem => menuItem.menuType === navbar_metadata_2.MenuType.UNAUTH);
                    this.userMenus = navbar_routes_config_1.ROUTES.filter(menuItem => menuItem.menuType === navbar_metadata_2.MenuType.AUTH);
                    this.brandMenu = navbar_routes_config_1.ROUTES.filter(menuItem => menuItem.menuType === navbar_metadata_2.MenuType.BRAND)[0];
                    this.currentUser = this.localStorage.getObject('currentUser');
                    console.log(' currentUser ' + JSON.stringify(this.currentUser));
                }
                get menuIcon() {
                    return this.isCollapsed ? '☰' : '✖';
                }
                getMenuItemClasses(menuItem) {
                    return {
                        'pull-xs-right': this.isCollapsed && menuItem.menuType === navbar_metadata_2.MenuType.UNAUTH
                    };
                }
                getUserMenuClasses(menuItem) {
                    return {
                        'pull-xs-right': this.isCollapsed && menuItem.menuType === navbar_metadata_2.MenuType.AUTH
                    };
                }
                checkAuth(event) {
                    event.stopPropagation();
                    console.log(' checkAuth call1 ' + this.currentUser);
                    if (this.currentUser == null) {
                        this.openModal('loginModalBtn');
                    }
                    else {
                        //this.router.navigateByUrl('/test', true);
                        //this.router.navigate(['/manageProperty/' + 'new'], true);
                        this.router.navigate([
                            'manageProperty', { Id: 'new' }
                        ]);
                    }
                }
                openModal(ButtonId) {
                    document.getElementById(ButtonId).click();
                }
                logout(event) {
                    event.stopPropagation();
                    this.localStorage.removeItem('currentUser');
                    this.renderer.invokeElementMethod(this.navbarbrand.nativeElement, 'click', []);
                }
            };
            __decorate([
                core_23.ViewChild(loginModal_component_1.LoginModalComponent), 
                __metadata('design:type', loginModal_component_1.LoginModalComponent)
            ], NavbarComponent.prototype, "modal", void 0);
            __decorate([
                core_23.ViewChild('navbarbrand'), 
                __metadata('design:type', Object)
            ], NavbarComponent.prototype, "navbarbrand", void 0);
            __decorate([
                core_23.ViewChild("Search"), 
                __metadata('design:type', core_23.ElementRef)
            ], NavbarComponent.prototype, "searchElementRef", void 0);
            NavbarComponent = __decorate([
                core_23.Component({
                    moduleId: module.id,
                    selector: 'navbar',
                    templateUrl: 'navbar.component.html',
                    styleUrls: ['navbar.component.css'],
                    providers: [angular2_cool_storage_5.CoolLocalStorage]
                }),
                __param(2, core_23.Inject(core_23.Renderer)), 
                __metadata('design:paramtypes', [angular2_cool_storage_5.CoolLocalStorage, router_7.Router, core_23.Renderer, index_6.AccountService, index_6.CommonAppService])
            ], NavbarComponent);
            exports_27("NavbarComponent", NavbarComponent);
        }
    }
});
System.register("components/models/property", [], function(exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
    var Property;
    return {
        setters:[],
        execute: function() {
            Property = class Property {
            };
            exports_28("Property", Property);
        }
    }
});
System.register("components/property/manageProperty.component", ['@angular/core', '@angular/platform-browser', '@angular/forms', '@angular/router', "services/index", 'ng2-datetime-picker', "app.component", "angular2-google-maps/core", 'angular2-cool-storage'], function(exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
    var core_24, platform_browser_2, forms_4, router_8, index_7, ng2_datetime_picker_1, app_component_3, core_25, angular2_cool_storage_6;
    var Dropzone, ManagePropertyComponent;
    return {
        setters:[
            function (core_24_1) {
                core_24 = core_24_1;
            },
            function (platform_browser_2_1) {
                platform_browser_2 = platform_browser_2_1;
            },
            function (forms_4_1) {
                forms_4 = forms_4_1;
            },
            function (router_8_1) {
                router_8 = router_8_1;
            },
            function (index_7_1) {
                index_7 = index_7_1;
            },
            function (ng2_datetime_picker_1_1) {
                ng2_datetime_picker_1 = ng2_datetime_picker_1_1;
            },
            function (app_component_3_1) {
                app_component_3 = app_component_3_1;
            },
            function (core_25_1) {
                core_25 = core_25_1;
            },
            function (angular2_cool_storage_6_1) {
                angular2_cool_storage_6 = angular2_cool_storage_6_1;
            }],
        execute: function() {
            Dropzone = require('../../../node_modules/dropzone/dist/dropzone-amd-module.js');
            ManagePropertyComponent = class ManagePropertyComponent {
                constructor(route, router, commonAppService, propertyService, uploadPictureService, renderer, mapsAPILoader, ngZone, localStorage) {
                    this.route = route;
                    this.router = router;
                    this.commonAppService = commonAppService;
                    this.propertyService = propertyService;
                    this.uploadPictureService = uploadPictureService;
                    this.renderer = renderer;
                    this.mapsAPILoader = mapsAPILoader;
                    this.ngZone = ngZone;
                    this.filesUploading = new core_24.EventEmitter();
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
                        if (typeof (this.propertyId) != "undefined" && this.propertyId != "new") {
                            this.isEdit = true;
                            this.submitBtnText = 'Save';
                            this.loading = true;
                            this.propertyService.getProperyById(this.propertyId)
                                .subscribe((data) => {
                                console.log(' data ' + JSON.stringify(data));
                                this.property = Object.assign({}, data);
                                this.initPictures(this.property.Pictures);
                                this.selectedPropertyType = this.property.PropertyType;
                                this.selectedAgreement = this.property.AgreementType;
                                this.selectedEmailOnly = this.property.IsEmailOnly;
                                this.selectedPhoneOnly = this.property.IsPhoneOnly;
                                this.property.UserId = this.currentUser.Id;
                                this.property.Smoking = (this.property.Smoking) ? "true" : "false";
                                this.setMapPosition({ 'latitude': this.property.Latitude, 'longitude': this.property.Longitude, 'address': this.property.Address });
                                if (this.property.IsActive == true) {
                                    this.isActive = this.property.IsActive;
                                    let event = new MouseEvent('click', { bubbles: true });
                                    this.renderer.invokeElementMethod(this.isActiveToggle.nativeElement, 'dispatchEvent', [event]);
                                    this.changeIsActive();
                                }
                                if (this.property.DateAvailable != null && this.property.DateAvailable != '') {
                                    //this.changeIsImmediateAvailable();
                                    this.property.DateAvailable = this.commonAppService.getFormattedDate(this.property.DateAvailable);
                                }
                                if (this.commonAppService.isUndefined(this.property.RentInclude)) {
                                    this.property.RentInclude = [];
                                }
                                if (this.commonAppService.isUndefined(this.property.Amenities)) {
                                    this.property.Amenities = [];
                                }
                                this.loading = false;
                            }, (error) => {
                                console.log(' Error while getProperyById : ' + JSON.stringify(error));
                                this.loading = false;
                            });
                        }
                        else {
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
                    this.searchControl = new forms_4.FormControl();
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
                                let place = autocomplete.getPlace();
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
                                if (place.geometry) {
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
                initPictures(Pictures) {
                    let _thisDropzoneFiles = this.dropzoneUploadedFiles;
                    for (let index in Pictures) {
                        let _thisPicture = Pictures[index];
                        let _thisDropzone = this.dropzone;
                        let _thisDropzoneUploadedFiles = this.dropzoneUploadedFiles;
                        _thisDropzoneUploadedFiles.push({
                            "Id": _thisPicture.Id,
                            "PropertyId": _thisPicture.PropertyId,
                            "Name": _thisPicture.Name,
                            "Url": _thisPicture.Url
                        });
                        let mockFile = new File([], _thisPicture.Name);
                        this.dropzone.options.addedfile.call(this.dropzone, mockFile);
                        this.dropzone.options.thumbnail.call(this.dropzone, mockFile, _thisPicture.Url);
                        this.dropzone.emit("complete", mockFile);
                        let removeButton = Dropzone.createElement("<a href=\"#\" class='glyphicon glyphicon-remove cursor-pointer'></a>");
                        removeButton.addEventListener("click", function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            // this.parent().remove();
                            _thisDropzone.removeFile(mockFile);
                            for (let obj of _thisDropzoneUploadedFiles) {
                                if (obj.Url == _thisPicture.Url) {
                                    _thisDropzoneUploadedFiles.splice(_thisDropzoneUploadedFiles.indexOf(obj), 1);
                                }
                            }
                            console.log(' inner _thisDropzoneUploadedFiles ' + JSON.stringify(_thisDropzoneUploadedFiles));
                        });
                        mockFile.previewElement.appendChild(removeButton);
                        this.dropzoneUploadedFiles = _thisDropzoneUploadedFiles;
                    }
                }
                updateLocation(event) {
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
                    geocoder.geocode(request, function (results, status) {
                        let newAddress = __this.commonAppService.getFormattedAddress(results[0]);
                        __this.address = __this.property.Address = newAddress;
                        //__this.setMapPosition({'latitude': newLat, 'longitude': newLng, 'address': newAddress});
                    });
                }
                setMapPosition(position) {
                    console.log(' setMapPosition ' + JSON.stringify(position));
                    this.latitude = this.property.Latitude = position.latitude;
                    this.longitude = this.property.Longitude = position.longitude;
                    this.address = this.property.Address = position.address;
                    this.zoom = 12;
                }
                mapBoundsChanged(bounds) {
                    //console.log(' mapBoundsChanged call ');
                    // if(!this.commonAppService.isUndefined(bounds)){
                    //     let center = bounds.getCenter();
                    //     let lat = center.lat();
                    //     let lng = center.lng();
                    //     console.log(' mapBoundsChanged ' + lat + ' | ' + lng);
                    // }
                }
                mapIdle(bounds) {
                    //console.log(' mapIdle call ');
                    // if(!this.commonAppService.isUndefined(bounds)){
                    //        let center = bounds.getCenter();
                    //        let lat = center.lat();
                    //        let lng = center.lng();
                    //        console.log(' mapIdle ' + lat + ' | ' + lng);
                    //    }
                }
                mapCenterChanged(event) {
                    //console.log(' mapCenterChanged call ');
                }
                initProperty() {
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
                }
                changeCheckbox(element, flag, field) {
                    if (!flag) {
                        this.property[field].splice(this.property[field].indexOf(element.value), 1);
                    }
                    else if (this.property[field].indexOf(element.value) <= -1) {
                        this.property[field].push(element.value);
                    }
                }
                changeIsActive() {
                    this.isActive = !this.isActive;
                    this.isActiveValue = (this.isActive) ? 'Yes' : 'No';
                    this.property.IsActive = this.isActive;
                }
                changeIsImmediateAvailable() {
                    this.property.IsImmediateAvailable = !this.property.IsImmediateAvailable;
                    if (this.property.IsImmediateAvailable == true) {
                        $('#DateAvailable').val("");
                    }
                    console.log(' this.property.DateAvailable ' + this.property.DateAvailable);
                }
                propAvailableDateChange() {
                    let selectedDate = $('#DateAvailable').val();
                    this.property.IsImmediateAvailable = (selectedDate != '') ? false : true;
                }
                manageProperty(event, model, isValid) {
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
                                .subscribe((data) => {
                                this.loading = false;
                                console.log(' data ' + JSON.stringify(data));
                                //this.router.navigate([this.returnUrl]);
                                this.router.navigate(['/myrentals']);
                            }, (error) => {
                                this.loading = false;
                                console.log(' Error while updateProperty : ' + JSON.stringify(error));
                            });
                        }
                        else if (this.isEdit == false) {
                            this.propertyService.addProperty(finalObject)
                                .subscribe((data) => {
                                this.loading = false;
                                console.log(' data ' + JSON.stringify(data));
                                //this.router.navigate([this.returnUrl]);
                                this.router.navigate(['/myrentals']);
                            }, (error) => {
                                this.loading = false;
                                console.log(' Error while addProperty : ' + JSON.stringify(error));
                            });
                        }
                    }
                }
                mergeObjects(obj1, obj2, callback) {
                    var obj3 = {};
                    for (var attrname in obj1) {
                        obj3[attrname] = obj1[attrname];
                    }
                    for (var attrname in obj2) {
                        obj3[attrname] = obj2[attrname];
                    }
                    callback(obj3);
                }
                get fileDropped() {
                    if (this.dropzone) {
                        return this.dropzone.files.length > 0;
                    }
                    return false;
                }
                ngAfterViewInit() {
                    this.dropzone = new Dropzone('div#dropzoneFileUpload', {
                        url: (files) => {
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
                    this.dropzone.on('addedfile', (file) => {
                        this.uploadPictureService.uploadPicture(file)
                            .subscribe((data) => {
                            console.log(' Upload File : ' + JSON.stringify(data));
                            if (data[0].url && data[0].url != "") {
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
                                removeButton.addEventListener("click", function (e) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    _thisDropzone.removeFile(file);
                                    console.log('mockFileUrl' + JSON.stringify(mockFileUrl));
                                    //dropzoneFiles.remove(mockFile);
                                    console.log('THIS.dropzoneUploadedFiles next' + JSON.stringify(THIS.dropzoneUploadedFiles));
                                    for (let obj of THIS.dropzoneUploadedFiles) {
                                        console.log('obj.Url' + JSON.stringify(obj.Url));
                                        console.log('mockFileUrl' + JSON.stringify(mockFileUrl));
                                        if (obj.Url == mockFileUrl) {
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
                        }, (error) => {
                            console.log(' error ' + JSON.stringify(error));
                            this.loading = false;
                        });
                    }).on('resetFiles', function () {
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
            };
            __decorate([
                core_24.Output(), 
                __metadata('design:type', core_24.EventEmitter)
            ], ManagePropertyComponent.prototype, "filesUploading", void 0);
            __decorate([
                core_24.ViewChild('isActiveToggle'), 
                __metadata('design:type', core_24.ElementRef)
            ], ManagePropertyComponent.prototype, "isActiveToggle", void 0);
            __decorate([
                core_24.ViewChild("Address"), 
                __metadata('design:type', core_24.ElementRef)
            ], ManagePropertyComponent.prototype, "searchElementRef", void 0);
            ManagePropertyComponent = __decorate([
                core_24.Component({
                    moduleId: module.id,
                    selector: 'manageProperty',
                    styles: [`
	    .sebm-google-map-container {
	      	height: 250px;
	    }
	`],
                    templateUrl: 'manageProperty.component.html',
                    providers: [angular2_cool_storage_6.CoolLocalStorage]
                }),
                core_24.NgModule({
                    imports: [platform_browser_2.BrowserModule, forms_4.FormsModule, ng2_datetime_picker_1.Ng2DatetimePickerModule],
                    declarations: [app_component_3.AppComponent],
                    bootstrap: [app_component_3.AppComponent]
                }), 
                __metadata('design:paramtypes', [router_8.ActivatedRoute, router_8.Router, index_7.CommonAppService, index_7.PropertyService, index_7.UploadPictureService, core_24.Renderer, core_25.MapsAPILoader, core_24.NgZone, angular2_cool_storage_6.CoolLocalStorage])
            ], ManagePropertyComponent);
            exports_29("ManagePropertyComponent", ManagePropertyComponent);
        }
    }
});
System.register("components/property/propertyDetails.component", ['@angular/core', '@angular/platform-browser', '@angular/forms', '@angular/router', "services/index", 'ng2-datetime-picker', "app.component", "angular2-google-maps/core"], function(exports_30, context_30) {
    "use strict";
    var __moduleName = context_30 && context_30.id;
    var core_26, platform_browser_3, forms_5, router_9, index_8, ng2_datetime_picker_2, app_component_4, core_27;
    var Direction, PropertyDetailsComponent;
    return {
        setters:[
            function (core_26_1) {
                core_26 = core_26_1;
            },
            function (platform_browser_3_1) {
                platform_browser_3 = platform_browser_3_1;
            },
            function (forms_5_1) {
                forms_5 = forms_5_1;
            },
            function (router_9_1) {
                router_9 = router_9_1;
            },
            function (index_8_1) {
                index_8 = index_8_1;
            },
            function (ng2_datetime_picker_2_1) {
                ng2_datetime_picker_2 = ng2_datetime_picker_2_1;
            },
            function (app_component_4_1) {
                app_component_4 = app_component_4_1;
            },
            function (core_27_1) {
                core_27 = core_27_1;
            }],
        execute: function() {
            (function (Direction) {
                Direction[Direction["UNKNOWN"] = 0] = "UNKNOWN";
                Direction[Direction["NEXT"] = 1] = "NEXT";
                Direction[Direction["PREV"] = 2] = "PREV";
            })(Direction || (Direction = {}));
            exports_30("Direction", Direction);
            PropertyDetailsComponent = class PropertyDetailsComponent {
                constructor(route, router, commonAppService, propertyService, renderer, mapsAPILoader, ngZone) {
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
                ngOnInit() {
                    this.initProperty();
                    this.route.params.subscribe(params => {
                        this.propertyId = params['Id'];
                        if (typeof (this.propertyId) != "undefined" && this.propertyId != "new") {
                            this.loading = true;
                            this.propertyService.getProperyById(this.propertyId)
                                .subscribe((data) => {
                                console.log(' data ' + JSON.stringify(data));
                                this.property = Object.assign({}, data);
                                //   	this.latitude = this.property.Latitude;
                                // this.longitude = this.property.Longitude;
                                // this.zoom = 12;
                                this.loading = false;
                                this.setMapPosition({ 'latitude': this.property.Latitude, 'longitude': this.property.Longitude, 'address': this.property.Address });
                                if (this.commonAppService.isUndefined(this.property.RentInclude)) {
                                    this.property.RentInclude = [];
                                }
                                if (this.commonAppService.isUndefined(this.property.Amenities)) {
                                    this.property.Amenities = [];
                                }
                            }, (error) => {
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
                setMapPosition(position) {
                    console.log(' setMapPosition ' + JSON.stringify(position));
                    this.latitude = position.latitude;
                    this.longitude = position.longitude;
                    this.zoom = 9;
                    $('#tabMap').next('a').click();
                }
                changeTab(event, tabVal) {
                    event.preventDefault();
                    this.tabActive = tabVal;
                }
                get interval() {
                    return this._interval;
                }
                set interval(value) {
                    this._interval = value;
                    //this.restartTimer();
                }
                isActive(url) {
                    return url === this.property.Pictures[0].Url;
                }
                initProperty() {
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
                }
                sendEmail(event, model, isValid) {
                    event.preventDefault();
                    console.log('model ' + JSON.stringify(model) + ' isValid ' + isValid);
                    model.Recipient = 'rathodgirishk@gmail.com';
                    if (isValid) {
                        this.commonAppService.sendEmail(model)
                            .subscribe((data) => {
                            this.loading = false;
                            console.log(' data ' + JSON.stringify(data));
                            this.email_success_msg = data;
                            this.email_fail_msg = '';
                        }, (error) => {
                            this.loading = false;
                            console.log(' Error while sendEmail : ' + JSON.stringify(error));
                            this.email_fail_msg = error;
                        });
                    }
                }
            };
            __decorate([
                core_26.Input(), 
                __metadata('design:type', Number)
            ], PropertyDetailsComponent.prototype, "interval", null);
            PropertyDetailsComponent = __decorate([
                core_26.Component({
                    moduleId: module.id,
                    selector: 'propertyDetails',
                    styles: [`
	    .sebm-google-map-container {
	      	height: 350px;
	    }
	`],
                    templateUrl: 'propertyDetails.component.html'
                }),
                core_26.NgModule({
                    imports: [platform_browser_3.BrowserModule, forms_5.FormsModule, ng2_datetime_picker_2.Ng2DatetimePickerModule],
                    declarations: [app_component_4.AppComponent],
                    bootstrap: [app_component_4.AppComponent],
                    schemas: [core_26.CUSTOM_ELEMENTS_SCHEMA]
                }), 
                __metadata('design:paramtypes', [router_9.ActivatedRoute, router_9.Router, index_8.CommonAppService, index_8.PropertyService, core_26.Renderer, core_27.MapsAPILoader, core_26.NgZone])
            ], PropertyDetailsComponent);
            exports_30("PropertyDetailsComponent", PropertyDetailsComponent);
        }
    }
});
System.register("components/custom/slider/carousel.component", ['@angular/core'], function(exports_31, context_31) {
    "use strict";
    var __moduleName = context_31 && context_31.id;
    var core_28;
    var Direction, Carousel;
    return {
        setters:[
            function (core_28_1) {
                core_28 = core_28_1;
            }],
        execute: function() {
            (function (Direction) {
                Direction[Direction["UNKNOWN"] = 0] = "UNKNOWN";
                Direction[Direction["NEXT"] = 1] = "NEXT";
                Direction[Direction["PREV"] = 2] = "PREV";
            })(Direction || (Direction = {}));
            exports_31("Direction", Direction);
            Carousel = class Carousel {
                constructor() {
                    this.slides = [];
                    this.destroyed = false;
                    console.log("Carousel created");
                }
                get interval() {
                    return this._interval;
                }
                set interval(value) {
                    this._interval = value;
                    this.restartTimer();
                }
                getInstance() {
                    return this;
                }
                select(nextSlide, direction = Direction.UNKNOWN) {
                    let nextIndex = nextSlide.index;
                    if (direction === Direction.UNKNOWN) {
                        direction = nextIndex > this.getCurrentIndex() ? Direction.NEXT : Direction.PREV;
                    }
                    // Prevent this user-triggered transition from occurring if there is already one in progress
                    if (nextSlide && nextSlide !== this.currentSlide) {
                        this.goNext(nextSlide, direction);
                    }
                }
                goNext(slide, direction) {
                    if (this.destroyed) {
                        return;
                    }
                    slide.direction = direction;
                    slide.active = true;
                    if (this.currentSlide) {
                        this.currentSlide.direction = direction;
                        this.currentSlide.active = false;
                    }
                    this.currentSlide = slide;
                    // every time you change slides, reset the timer
                    this.restartTimer();
                }
                getSlideByIndex(index) {
                    let len = this.slides.length;
                    for (let i = 0; i < len; ++i) {
                        if (this.slides[i].index === index) {
                            return this.slides[i];
                        }
                    }
                }
                getCurrentIndex() {
                    return !this.currentSlide ? 0 : this.currentSlide.index;
                }
                next() {
                    let newIndex = (this.getCurrentIndex() + 1) % this.slides.length;
                    if (newIndex === 0 && this.noWrap) {
                        this.pause();
                        return;
                    }
                    return this.select(this.getSlideByIndex(newIndex), Direction.NEXT);
                }
                prev() {
                    let newIndex = this.getCurrentIndex() - 1 < 0 ? this.slides.length - 1 : this.getCurrentIndex() - 1;
                    if (this.noWrap && newIndex === this.slides.length - 1) {
                        this.pause();
                        return;
                    }
                    return this.select(this.getSlideByIndex(newIndex), Direction.PREV);
                }
                restartTimer() {
                    this.resetTimer();
                    let interval = +this.interval;
                    if (!isNaN(interval) && interval > 0) {
                        this.currentInterval = setInterval(() => {
                            let nInterval = +this.interval;
                            if (this.isPlaying && !isNaN(this.interval) && nInterval > 0 && this.slides.length) {
                                this.next();
                            }
                            else {
                                this.pause();
                            }
                        }, interval);
                    }
                }
                resetTimer() {
                    if (this.currentInterval) {
                        clearInterval(this.currentInterval);
                        this.currentInterval = null;
                    }
                }
                play() {
                    if (!this.isPlaying) {
                        this.isPlaying = true;
                        this.restartTimer();
                    }
                }
                pause() {
                    if (!this.noPause) {
                        this.isPlaying = false;
                        this.resetTimer();
                    }
                }
                addSlide(slide) {
                    slide.index = this.slides.length;
                    this.slides.push(slide);
                    if (this.slides.length === 1 || slide.active) {
                        this.select(this.slides[this.slides.length - 1]);
                        if (this.slides.length === 1) {
                            this.play();
                        }
                    }
                    else {
                        slide.active = false;
                    }
                }
            };
            __decorate([
                core_28.Input(), 
                __metadata('design:type', Boolean)
            ], Carousel.prototype, "noWrap", void 0);
            __decorate([
                core_28.Input(), 
                __metadata('design:type', Boolean)
            ], Carousel.prototype, "noPause", void 0);
            __decorate([
                core_28.Input(), 
                __metadata('design:type', Boolean)
            ], Carousel.prototype, "noTransition", void 0);
            __decorate([
                core_28.Input(), 
                __metadata('design:type', Number)
            ], Carousel.prototype, "interval", null);
            Carousel = __decorate([
                core_28.Component({
                    moduleId: module.id,
                    selector: 'carousel',
                    templateUrl: 'carousel.component.html'
                }), 
                __metadata('design:paramtypes', [])
            ], Carousel);
            exports_31("Carousel", Carousel);
        }
    }
});
System.register("components/custom/slider/slide.component", ['@angular/core', "components/custom/slider/carousel.component"], function(exports_32, context_32) {
    "use strict";
    var __moduleName = context_32 && context_32.id;
    var core_29, carousel_component_1;
    var Slide;
    return {
        setters:[
            function (core_29_1) {
                core_29 = core_29_1;
            },
            function (carousel_component_1_1) {
                carousel_component_1 = carousel_component_1_1;
            }],
        execute: function() {
            Slide = class Slide {
                constructor(carousel) {
                    this.carousel = carousel;
                    this.addClass = true;
                }
                ngOnInit() {
                    this.carousel.addSlide(this);
                }
                ngOnDestroy() {
                }
            };
            __decorate([
                core_29.Input(), 
                __metadata('design:type', Number)
            ], Slide.prototype, "index", void 0);
            __decorate([
                core_29.Input(), 
                __metadata('design:type', Number)
            ], Slide.prototype, "direction", void 0);
            __decorate([
                core_29.HostBinding('class.active'),
                core_29.Input(), 
                __metadata('design:type', Boolean)
            ], Slide.prototype, "active", void 0);
            __decorate([
                core_29.HostBinding('class.item'),
                core_29.HostBinding('class.carousel-item'), 
                __metadata('design:type', Boolean)
            ], Slide.prototype, "addClass", void 0);
            Slide = __decorate([
                core_29.Component({
                    moduleId: module.id,
                    selector: 'slide',
                    templateUrl: 'slide.component.html'
                }), 
                __metadata('design:paramtypes', [carousel_component_1.Carousel])
            ], Slide);
            exports_32("Slide", Slide);
        }
    }
});
System.register("app.routing", ['@angular/router', "components/home/home.component", "components/profile/profile.component", "components/myrentals/myrentals.component", "components/about/about.component", "components/contact/contact.component", "components/property/manageProperty.component", "components/property/propertyDetails.component", "components/auth/auth.component"], function(exports_33, context_33) {
    "use strict";
    var __moduleName = context_33 && context_33.id;
    var router_10, home_component_1, profile_component_1, myrentals_component_1, about_component_1, contact_component_1, manageProperty_component_1, propertyDetails_component_1, auth_component_1;
    var appRoutes, routing;
    return {
        setters:[
            function (router_10_1) {
                router_10 = router_10_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (profile_component_1_1) {
                profile_component_1 = profile_component_1_1;
            },
            function (myrentals_component_1_1) {
                myrentals_component_1 = myrentals_component_1_1;
            },
            function (about_component_1_1) {
                about_component_1 = about_component_1_1;
            },
            function (contact_component_1_1) {
                contact_component_1 = contact_component_1_1;
            },
            function (manageProperty_component_1_1) {
                manageProperty_component_1 = manageProperty_component_1_1;
            },
            function (propertyDetails_component_1_1) {
                propertyDetails_component_1 = propertyDetails_component_1_1;
            },
            function (auth_component_1_1) {
                auth_component_1 = auth_component_1_1;
            }],
        execute: function() {
            appRoutes = [
                {
                    path: '',
                    component: home_component_1.HomeComponent
                },
                {
                    path: 'about',
                    component: about_component_1.AboutComponent
                },
                {
                    path: 'contact',
                    component: contact_component_1.ContactComponent
                },
                {
                    path: 'profile',
                    component: profile_component_1.ProfileComponent,
                    canActivate: [auth_component_1.AuthComponent]
                },
                {
                    path: 'myrentals',
                    component: myrentals_component_1.MyRentalsComponent,
                    canActivate: [auth_component_1.AuthComponent]
                },
                {
                    path: 'manageProperty',
                    component: manageProperty_component_1.ManagePropertyComponent,
                    canActivate: [auth_component_1.AuthComponent]
                },
                {
                    path: 'propertyDetails',
                    component: propertyDetails_component_1.PropertyDetailsComponent
                },
                { path: '**',
                    redirectTo: ''
                }
            ];
            exports_33("routing", routing = router_10.RouterModule.forRoot(appRoutes));
        }
    }
});
System.register("app.module", ['@angular/core', '@angular/platform-browser', '@angular/forms', '@angular/http', 'angular2-cool-storage', "components/forms/equal-validator.directive", "services/index", "app.component", "components/auth/auth.component", "components/popup-modals/loginModal.component", "components/popup-modals/registrationModal.component", "components/user/user.component", "components/profile/profile.component", "components/myrentals/myrentals.component", "components/home/home.component", "components/about/about.component", "components/contact/contact.component", "components/navbar/navbar.component", "components/property/manageProperty.component", "components/property/propertyDetails.component", "components/map/map.component", "components/custom/slider/slide.component", "components/custom/slider/carousel.component", "components/custom/multiselect/multiselect.component", "angular2-google-maps/core", "app.routing"], function(exports_34, context_34) {
    "use strict";
    var __moduleName = context_34 && context_34.id;
    var core_30, platform_browser_4, forms_6, http_8, angular2_cool_storage_7, equal_validator_directive_1, index_9, app_component_5, auth_component_2, loginModal_component_2, registrationModal_component_1, user_component_1, profile_component_2, myrentals_component_2, home_component_2, about_component_2, contact_component_2, navbar_component_1, manageProperty_component_2, propertyDetails_component_2, map_component_2, slide_component_1, carousel_component_2, multiselect_component_2, core_31, app_routing_1;
    var AppModule;
    return {
        setters:[
            function (core_30_1) {
                core_30 = core_30_1;
            },
            function (platform_browser_4_1) {
                platform_browser_4 = platform_browser_4_1;
            },
            function (forms_6_1) {
                forms_6 = forms_6_1;
            },
            function (http_8_1) {
                http_8 = http_8_1;
            },
            function (angular2_cool_storage_7_1) {
                angular2_cool_storage_7 = angular2_cool_storage_7_1;
            },
            function (equal_validator_directive_1_1) {
                equal_validator_directive_1 = equal_validator_directive_1_1;
            },
            function (index_9_1) {
                index_9 = index_9_1;
            },
            function (app_component_5_1) {
                app_component_5 = app_component_5_1;
            },
            function (auth_component_2_1) {
                auth_component_2 = auth_component_2_1;
            },
            function (loginModal_component_2_1) {
                loginModal_component_2 = loginModal_component_2_1;
            },
            function (registrationModal_component_1_1) {
                registrationModal_component_1 = registrationModal_component_1_1;
            },
            function (user_component_1_1) {
                user_component_1 = user_component_1_1;
            },
            function (profile_component_2_1) {
                profile_component_2 = profile_component_2_1;
            },
            function (myrentals_component_2_1) {
                myrentals_component_2 = myrentals_component_2_1;
            },
            function (home_component_2_1) {
                home_component_2 = home_component_2_1;
            },
            function (about_component_2_1) {
                about_component_2 = about_component_2_1;
            },
            function (contact_component_2_1) {
                contact_component_2 = contact_component_2_1;
            },
            function (navbar_component_1_1) {
                navbar_component_1 = navbar_component_1_1;
            },
            function (manageProperty_component_2_1) {
                manageProperty_component_2 = manageProperty_component_2_1;
            },
            function (propertyDetails_component_2_1) {
                propertyDetails_component_2 = propertyDetails_component_2_1;
            },
            function (map_component_2_1) {
                map_component_2 = map_component_2_1;
            },
            function (slide_component_1_1) {
                slide_component_1 = slide_component_1_1;
            },
            function (carousel_component_2_1) {
                carousel_component_2 = carousel_component_2_1;
            },
            function (multiselect_component_2_1) {
                multiselect_component_2 = multiselect_component_2_1;
            },
            function (core_31_1) {
                core_31 = core_31_1;
            },
            function (app_routing_1_1) {
                app_routing_1 = app_routing_1_1;
            }],
        execute: function() {
            AppModule = class AppModule {
            };
            AppModule = __decorate([
                core_30.NgModule({
                    imports: [
                        core_31.AgmCoreModule.forRoot({
                            apiKey: "AIzaSyBuwOohTTSPG0fe2jsNyWQtmx7ivPz6dmA",
                            libraries: ["places"]
                        }),
                        platform_browser_4.BrowserModule,
                        forms_6.FormsModule,
                        forms_6.ReactiveFormsModule,
                        http_8.HttpModule,
                        app_routing_1.routing
                    ],
                    declarations: [
                        app_component_5.AppComponent,
                        equal_validator_directive_1.EqualValidator,
                        navbar_component_1.NavbarComponent,
                        loginModal_component_2.LoginModalComponent,
                        registrationModal_component_1.RegistrationModalComponent,
                        home_component_2.HomeComponent,
                        profile_component_2.ProfileComponent,
                        myrentals_component_2.MyRentalsComponent,
                        user_component_1.UserComponent,
                        about_component_2.AboutComponent,
                        contact_component_2.ContactComponent,
                        manageProperty_component_2.ManagePropertyComponent,
                        propertyDetails_component_2.PropertyDetailsComponent,
                        map_component_2.MapComponent,
                        carousel_component_2.Carousel,
                        slide_component_1.Slide,
                        multiselect_component_2.Multiselect,
                        multiselect_component_2.FilterPipe
                    ],
                    providers: [
                        auth_component_2.AuthComponent,
                        index_9.AccountService,
                        index_9.UserService,
                        index_9.PropertyService,
                        index_9.ProfileService,
                        index_9.CommonAppService,
                        index_9.UploadPictureService,
                        angular2_cool_storage_7.CoolLocalStorage
                    ],
                    bootstrap: [
                        app_component_5.AppComponent
                    ]
                }), 
                __metadata('design:paramtypes', [])
            ], AppModule);
            exports_34("AppModule", AppModule);
        }
    }
});
System.register("main", ['@angular/platform-browser-dynamic', "app.module"], function(exports_35, context_35) {
    "use strict";
    var __moduleName = context_35 && context_35.id;
    var platform_browser_dynamic_1, app_module_1;
    return {
        setters:[
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (app_module_1_1) {
                app_module_1 = app_module_1_1;
            }],
        execute: function() {
            platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
        }
    }
});
//# sourceMappingURL=bundle.js.map