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
Object.defineProperty(exports, "__esModule", { value: true });
/**
* angular 5 에서의 http 사용법
app.module.ts
import { HttpClientModule } from '@angular/common/http';/
imports: [
  HttpClientModule
],

*/
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
const Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
let RestHttpClient = class RestHttpClient {
    constructor(http) {
        this.http = http;
        //	this.apiUrl = constants.API_URL;
    }
    /**
    * @return Json
    */
    getapi(obj, callback) {
        let apiUrl = this.apiUrl + obj.url;
        let params = obj.params;
        let result = this.http.get(apiUrl, { observe: 'response' })
            .map(this.extractData)
            .catch(this.handleError);
        result.subscribe(data => callback(data), err => this.logError(err));
    }
    /**
    * @return String
    */
    directget(obj, callback) {
        let apiUrl = obj.url;
        this.http.get(apiUrl)
            .subscribe(
        // Successful responses call the first callback.
        data => {
            callback(data);
        }, 
        // Errors will call this callback instead:
        err => {
            console.log('Something went wrong!');
        });
    }
    postapi(obj, callback) {
        let apiUrl = this.apiUrl + obj.url;
        //	let params = obj.params;
        let headers = new Headers(); //{ 'Content-Type': 'application/json' }
        //	headers.append('Access-Control-Allow-Headers', '*');//이부분은 서버의 설정과 동일해야 한다.
        headers.append('Authorization', "Bearer " + localStorage.getItem('authToken'));
        let result = this.http.post(apiUrl, { headers: headers })
            .map(this.extractData)
            .catch(this.handleError);
        result.subscribe(data => callback(data), err => this.logError(err));
    }
    //private extractData(res: Response) {
    extractData(res) {
        try {
            let body = res.json();
            return body || {};
        }
        catch (e) {
            return res._body;
        }
    }
    handleError(error) {
        let errMsg;
        if (error instanceof Response) {
            errMsg = '';
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable_1.Observable.throw(errMsg);
    }
    logError(err) {
        console.error('There was an error: ' + err);
    }
};
RestHttpClient = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.HttpClient])
], RestHttpClient);
exports.RestHttpClient = RestHttpClient;
