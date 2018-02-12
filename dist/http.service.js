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
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
var RestHttpClient = (function () {
    function RestHttpClient(http) {
        this.http = http;
        //	this.apiUrl = constants.API_URL;
    }
    /**
    * @return Json
    */
    RestHttpClient.prototype.getapi = function (obj, callback) {
        var _this = this;
        var apiUrl = this.apiUrl + obj.url;
        var params = obj.params;
        var result = this.http.get(apiUrl, { observe: 'response' })
            .map(this.extractData)
            .catch(this.handleError);
        result.subscribe(function (data) { return callback(data); }, function (err) { return _this.logError(err); });
    };
    /**
    * @return String
    */
    RestHttpClient.prototype.directget = function (obj, callback) {
        var apiUrl = obj.url;
        this.http.get(apiUrl)
            .subscribe(
        // Successful responses call the first callback.
        function (data) {
            callback(data);
        }, 
        // Errors will call this callback instead:
        function (err) {
            console.log('Something went wrong!');
        });
    };
    RestHttpClient.prototype.postapi = function (obj, callback) {
        var _this = this;
        var apiUrl = this.apiUrl + obj.url;
        //	let params = obj.params;
        var headers = new Headers(); //{ 'Content-Type': 'application/json' }
        headers.append('Authorization', "Bearer " + localStorage.getItem('authToken'));
        var result = this.http.post(apiUrl, { headers: headers })
            .map(this.extractData)
            .catch(this.handleError);
        result.subscribe(function (data) { return callback(data); }, function (err) { return _this.logError(err); });
    };
    //private extractData(res: Response) {
    RestHttpClient.prototype.extractData = function (res) {
        try {
            var body = res.json();
            return body || {};
        }
        catch (e) {
            return res._body;
        }
    };
    RestHttpClient.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof Response) {
            errMsg = '';
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable_1.Observable.throw(errMsg);
    };
    RestHttpClient.prototype.logError = function (err) {
        console.error('There was an error: ' + err);
    };
    RestHttpClient = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], RestHttpClient);
    return RestHttpClient;
}());
exports.RestHttpClient = RestHttpClient;
