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
//import { FormData } from 'form-data';
var Rx_1 = require('rxjs/Rx');
require('rxjs/add/operator/map');
var static_variable_1 = require('../services/static-variable');
//let FormData = require('../../../node_modules/form-data/lib/form_data.js');
var UploadPictureService = (function () {
    function UploadPictureService(http) {
        this.http = http;
    }
    UploadPictureService.prototype.uploadPicture = function (file) {
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
        return Rx_1.Observable.fromPromise(new Promise(function (resolve, reject) {
            var formData = new FormData();
            var xhr = new XMLHttpRequest();
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
            xhr.open("POST", static_variable_1.GlobalVariable.BASE_API_URL + static_variable_1.GlobalVariable.UPLOAD_PICTURE, true);
            xhr.send(formData);
        }));
    };
    UploadPictureService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UploadPictureService);
    return UploadPictureService;
}());
exports.UploadPictureService = UploadPictureService;
//# sourceMappingURL=upload-picture.service.js.map