import { Injectable } from '@angular/core';
//import { Response, Headers } from '@angular/http';//RequestMethod,RequestOptions,
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
//import * as constants from '../constants/app.constant'; //<==== this one

@Injectable()
export class Rest {

//	private apiUrl = 'https://restcountries.eu/rest/v2/all';
	private apiUrl:string;
	constructor(public http: HttpClient) {
		//this.apiUrl = constants.API_URL;
	}

	/** http client 방식 **/
	getapi(obj, callback: Function) {

		let apiUrl = this.apiUrl + obj.url;
		let params = obj.params;
		let headers = new HttpHeaders({ 'Authorization': 'Bearer '+localStorage.getItem('authToken') });//{ 'Content-Type': 'application/json' }
		this.http.get(apiUrl, {params: params, headers:headers}).subscribe(data => {
		  // Read the result field from the JSON response.
		  callback(data);
		}), err => this.logError(err);
	}

	postapi(obj, callback: Function) {
		let apiUrl = this.apiUrl + obj.url;
		let headers = new HttpHeaders({ 'Authorization': 'Bearer '+localStorage.getItem('authToken') });//{ 'Content-Type': 'application/json' }
		this.http.post(apiUrl, obj.params, {headers:headers}).subscribe(data => {
		  callback(data);
	  }), err => this.logError(err);
		/*
		let result = this.http.post(apiUrl,  obj.params, {headers:headers})
			.map(this.extractData)
			.catch(this.handleError);

		result.subscribe(
			data => callback(data),
			err => this.logError(err),
		//	() => console.log('')
		);
		*/
	}

	/* HTTP 방식
	getapi(obj, callback: Function) {
		let headers = new Headers();//{ 'Content-Type': 'application/json' }
	//	headers.append('Access-Control-Allow-Headers', '*');//이부분은 서버의 설정과 동일해야 한다.
		headers.append('Authorization', "Bearer "+localStorage.getItem('authToken'));

		let apiUrl = this.apiUrl + obj.url;
		let params = obj.params;
		let result = this.http.get(apiUrl, {search: params, headers:headers})
			.map(this.extractData)
			.catch(this.handleError);

		result.subscribe(
			data => callback(data),
			err => this.logError(err),
			//() => console.log('')
		);
	}


	postapi(obj, callback: Function) {
		let apiUrl = this.apiUrl + obj.url;
	//	let params = obj.params;

		let headers = new Headers();//{ 'Content-Type': 'application/json' }
	//	headers.append('Access-Control-Allow-Headers', '*');//이부분은 서버의 설정과 동일해야 한다.
		headers.append('Authorization', "Bearer "+localStorage.getItem('authToken'));
		let result = this.http.post(apiUrl,  obj.params, {headers:headers})
			.map(this.extractData)
			.catch(this.handleError);

		result.subscribe(
			data => callback(data),
			err => this.logError(err),
		//	() => console.log('')
		);
	}
*/
	//private extractData(res: Response) {
	private extractData(res: any) {
		try{
			let body = res.json();
			return body || {};
		}catch(e){
			return res._body;
		}
	}
/*
	private handleError(error: Response | any) {
		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		console.error(errMsg);
		return Observable.throw(errMsg);
	}
*/
	private logError(err) {
		console.error('There was an error: ' + err);
	}
}
