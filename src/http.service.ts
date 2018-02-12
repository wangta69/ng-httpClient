
/**
* angular 5 에서의 http 사용법
app.module.ts
import { HttpClientModule } from '@angular/common/http';/
imports: [
  HttpClientModule
],

*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class RestHttpClient {

	private apiUrl:string;
	constructor(private http: HttpClient) {
	//	this.apiUrl = constants.API_URL;
	}

	/**
	* @return Json
	*/
	getapi(obj:any, callback: Function) {
		let apiUrl = this.apiUrl + obj.url;
		let params = obj.params;
		let result = this.http.get(apiUrl, {observe: 'response'})
			.map(this.extractData)
			.catch(this.handleError);

		result.subscribe(
			data => callback(data),
			err => this.logError(err),
			//() => console.log('')
		);
	}

	/**
	* @return String
	*/
	directget(obj:any, callback: Function) {
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
		    }
  		);
	}


	postapi(obj:any, callback: Function) {
		let apiUrl = this.apiUrl + obj.url;
	//	let params = obj.params;

		let headers = new Headers();//{ 'Content-Type': 'application/json' }
	//	headers.append('Access-Control-Allow-Headers', '*');//이부분은 서버의 설정과 동일해야 한다.
		headers.append('Authorization', "Bearer "+localStorage.getItem('authToken'));
		let result = this.http.post(apiUrl,  {headers:headers})
			.map(this.extractData)
			.catch(this.handleError);

		result.subscribe(
			data => callback(data),
			err => this.logError(err),
		//	() => console.log('')
		);
	}

	//private extractData(res: Response) {
	private extractData(res: any) {
		try{
			let body = res.json();
			return body || {};
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
