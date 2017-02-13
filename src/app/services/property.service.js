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
var PropertyService = (function () {
    function PropertyService(http) {
        this.http = http;
    }
    PropertyService.prototype.getAllProperties = function () {
        return this.http.get(static_variable_1.GlobalVariable.BASE_API_URL + static_variable_1.GlobalVariable.GET_ALL_PROPERTY)
            .map(function (data) {
            data.json();
            return data.json();
        });
    };
    PropertyService.prototype.getAllPropertiesByLatLong = function (lat, long, limit) {
        return this.http.get(static_variable_1.GlobalVariable.BASE_API_URL + static_variable_1.GlobalVariable.GET_ALL_PROPERTY_BY_LAT_LONG + '?latitude= ' + lat + '&longitude=' + long + '&limit=' + limit)
            .map(function (data) {
            data.json();
            return data.json();
        });
    };
    PropertyService.prototype.getAllPropertiesByLatLong2 = function (lat1, lat2, long1, long2, limit) {
        return this.http.get(static_variable_1.GlobalVariable.BASE_API_URL + static_variable_1.GlobalVariable.GET_ALL_PROPERTY_BY_LAT_LONG2 + '?lat1= ' + lat1 + '&lat2=' + lat2 + '&long1=' + long1 + '&long2=' + long2 + '&limit=' + limit)
            .map(function (data) {
            data.json();
            return data.json();
        });
    };
    PropertyService.prototype.getAllPropertiesByGeoLatLong = function (lat, long, limit) {
        return this.http.get(static_variable_1.GlobalVariable.BASE_API_URL + static_variable_1.GlobalVariable.GET_ALL_PROPERTY_BY_GEO_LAT_LONG + '?latitude= ' + lat + '&longitude=' + long + '&limit=' + limit)
            .map(function (data) {
            data.json();
            return data.json();
        });
    };
    PropertyService.prototype.getProperyById = function (Id) {
        return this.http.get(static_variable_1.GlobalVariable.BASE_API_URL + static_variable_1.GlobalVariable.GET_PROPERTY_BY_ID + '/' + Id)
            .map(function (data) {
            data.json();
            return data.json();
        });
    };
    PropertyService.prototype.getAllPropertiesByUserId = function (Id) {
        return this.http.get(static_variable_1.GlobalVariable.BASE_API_URL + static_variable_1.GlobalVariable.GET_PROPERTY_BY_USERID + '?userId=' + Id)
            .map(function (data) {
            data.json();
            return data.json();
        });
    };
    PropertyService.prototype.addProperty = function (property) {
        var body = JSON.stringify(property);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(static_variable_1.GlobalVariable.BASE_API_URL + static_variable_1.GlobalVariable.ADD_PROPERTY, body, options)
            .map(function (data) {
            data.json();
            return data.json();
        });
    };
    PropertyService.prototype.updateProperty = function (property) {
        var body = JSON.stringify(property);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        console.log(' updateProperty call');
        return this.http.post(static_variable_1.GlobalVariable.BASE_API_URL + static_variable_1.GlobalVariable.UPDATE_PROPERTY, body, options)
            .map(function (data) {
            data.json();
            return data.json();
        });
    };
    PropertyService.prototype.activeDeactivePropertyById = function (Id, status) {
        var ActiveDeactiveUrl = (status == true) ? static_variable_1.GlobalVariable.ACTIVE_PROPERTY_BY_ID : static_variable_1.GlobalVariable.DEACTIVE_PROPERTY_BY_ID;
        var body = {};
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        console.log(' ActiveDeactiveUrl ' + ActiveDeactiveUrl);
        return this.http.post(static_variable_1.GlobalVariable.BASE_API_URL + ActiveDeactiveUrl + '/' + Id, body, options)
            .map(function (data) {
            data.json();
            return data.json();
        });
    };
    PropertyService.prototype.deletePropertyById = function (Id) {
        var body = {};
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(static_variable_1.GlobalVariable.BASE_API_URL + static_variable_1.GlobalVariable.DELETE_PROPERTY_BY_ID + '/' + Id, body, options)
            .map(function (data) {
            data.json();
            return data.json();
        });
    };
    PropertyService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PropertyService);
    return PropertyService;
}());
exports.PropertyService = PropertyService;
//# sourceMappingURL=property.service.js.map