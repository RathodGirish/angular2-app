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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var static_variable_1 = require('../services/static-variable');
var CommonAppService = (function () {
    function CommonAppService(http) {
        this.http = http;
        console.log(' CommonService call');
    }
    CommonAppService.prototype.mergeObjects = function (obj1, obj2, callback) {
        var obj3 = {};
        for (var attrname in obj1) {
            obj3[attrname] = obj1[attrname];
        }
        for (var attrname in obj2) {
            obj3[attrname] = obj2[attrname];
        }
        callback(obj3);
    };
    CommonAppService.prototype.getFormattedAddress = function (place) {
        var street_number = "", name = "", address = "", city = "", state = "", zip = "", country = "", formattedAddress = "";
        for (var i = 0; i < place.address_components.length; i++) {
            var addr = place.address_components[i];
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
        var array = formattedAddress.split(',');
        var newArray = array.filter(function (v) { return v !== ''; });
        if (address == '' && city == '') {
            return "";
        }
        return formattedAddress;
    };
    CommonAppService.prototype.getFormattedDate = function (date) {
        var dt = new Date(date);
        return (dt.getFullYear() + '-' + ('0' + (dt.getMonth() + 1)).slice(-2) + '-' + ('0' + dt.getDate()).slice(-2));
    };
    CommonAppService.prototype.getDayDiffFromTwoDate = function (firstDate, secondDate) {
        var dayDiff = (secondDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24);
        return dayDiff;
    };
    CommonAppService.prototype.sendEmail = function (emailUser) {
        var body = JSON.stringify(emailUser);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(static_variable_1.GlobalVariable.BASE_API_URL + static_variable_1.GlobalVariable.SEND_EMAIL, body, options)
            .map(function (data) {
            data.json();
            return data.json();
        });
    };
    //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
    CommonAppService.prototype.calDistance = function (lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = this.toRad(lat2 - lat1);
        var dLon = this.toRad(lon2 - lon1);
        var radlat1 = this.toRad(lat1);
        var radlat2 = this.toRad(lat2);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(radlat1) * Math.cos(radlat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    };
    // Converts numeric degrees to radians
    CommonAppService.prototype.toRad = function (Value) {
        return Value * Math.PI / 180;
    };
    CommonAppService.prototype.isUndefined = function (obj) {
        if (typeof obj == 'undefined' || obj == null || obj == '') {
            return true;
        }
        else {
            return false;
        }
    };
    CommonAppService.prototype.getSelectedFromMultiselect = function (object) {
        var array = [];
        for (var key in object) {
            console.log(' object ' + JSON.stringify(object[key]));
            if (object[key].checked && object[key].checked == true) {
                array.push(object[key].value);
            }
        }
        return array;
    };
    CommonAppService.prototype.getArrayFromString = function (object) {
        var array = [];
        // let items = object.slice(1, -1).split(',');
        // console.log(' rentalItem.items ' + JSON.stringify(items));
        // for (let k in items){
        //     console.log(' items[k] ' + JSON.stringify(items[k]).replace(/['"]+/g, '').slice(1, -1));
        //     array.push(JSON.stringify(items[k]).replace(/['"]+/g, '').slice(1, -1));
        // }
        return array;
    };
    CommonAppService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CommonAppService);
    return CommonAppService;
}());
exports.CommonAppService = CommonAppService;
//# sourceMappingURL=commonapp.service.js.map