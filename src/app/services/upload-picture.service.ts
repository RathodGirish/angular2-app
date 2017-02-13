import { Component, Injectable, NgModule, Inject } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions, RequestMethod, URLSearchParams } from '@angular/http';

//import { FormData } from 'form-data';

// import { Observable } from 'rxjs/Rx';
import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/map';
import { GlobalVariable } from '../services/static-variable';
//let FormData = require('../../../node_modules/form-data/lib/form_data.js');

@Injectable()
export class UploadPictureService {
    headers : Headers;
    constructor(public http: Http) {
    }

    uploadPicture(file: any) {
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


        return Observable.fromPromise(new Promise((resolve, reject) => {
            let formData: any = new FormData()
            let xhr = new XMLHttpRequest()
            formData.append("files", file, file.name)
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response))
                    } else {
                        reject(xhr.response)
                    }
                }
            }
            xhr.open("POST", GlobalVariable.BASE_API_URL + GlobalVariable.UPLOAD_PICTURE, true);
            xhr.send(formData);
        }));
    }
}