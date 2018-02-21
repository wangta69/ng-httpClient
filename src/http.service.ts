import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class RestHttpClient {

	constructor(private http: HttpClient) {}

	/**
	* @param Object {url, params, headers}
	* url : String,
	* params {k1:v1, k2:v2....}
	* headers {k1:v1, k2:v2....}
	* @return Callback Function
	*/
	get(obj:any, callback: Function) {
		let apiUrl = obj.url;

		let body:any = {};
		body.observe = 'response';

		if(typeof obj.params != 'undefined'){
			let Params = new HttpParams();
			Object.entries(obj.params).forEach(
			  ([key, value]) => Params = Params.append(key, value)
			);

			body.params = Params;
		}

		if(typeof obj.headers != 'undefined'){
			body.headers = this.createHeders(obj.headers);
		}

		if(typeof obj.headers != 'undefined'){
			this.createHeders(obj.headers);
		}

		let result = this.http.get(apiUrl, body)// the whole Response object you can observe for it
			.map(this.extractData)
			.catch(this.handleError);

		result.subscribe(
			data => callback(data),
			err => this.logError(err),
			//() => console.log('')
		);
	}

	/**
	* @param Object {url, params}
	* @return Callback Function
	*/
	post(obj:any, callback: Function) {
		//let apiUrl = this.apiUrl + obj.url;
		let apiUrl = obj.url;
		let params = obj.params;

		let body:any = {};
		body.observe = 'response';

		if(typeof obj.headers != 'undefined'){
			body.headers = this.createHeders(obj.headers);
		}

		let result = this.http.post(apiUrl, params,  body)
			.map(this.extractData)
			.catch(this.handleError);

		result.subscribe(
			data => callback(data),
			err => this.logError(err),
		//	() => console.log('')
		);
	}

	/**
	* @param Object headers : headers {k1:v1, k2:v2....}
	*/
	private createHeders(headers){
		let header = new HttpHeaders();//{ 'Content-Type': 'application/json' }

		Object.entries(headers).forEach(
		  ([key, value]) => header = header.append(key, value)
		);

		return header;

		//header.append('Authorization', "Bearer "+localStorage.getItem('authToken'));
	}

	//private extractData(res: Response) {
	private extractData(res: any) {

		try{
			//{header, status, ok, statusText, type, url, body}
			if( typeof res.constructor != "undefined" && res.constructor.name == 'HttpResponse')
				return res.body;
			else {
				let body = res.json();
				return body || {};
			}
		}catch(e){
			return res._body;
		}
	}



	private handleError(error: Response | any) {
		let errMsg: string;
		if (error instanceof Response) {
            errMsg = '';
		} else {
			errMsg = error.message ? error.message : error.toString();
		}

		return Observable.throw(errMsg);
	}

	private logError(err:string) {
		console.error('There was an error: ' + err);
	}
}
