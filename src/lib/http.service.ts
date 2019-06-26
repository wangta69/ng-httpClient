import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
    get(obj: any): Promise<any> {
        const apiUrl = obj.url;
        const body: any = {};
        body.observe = 'response';

        if (!Object.entries) {
            Object.entries = ( entryObj: any ) => {
                const ownProps = Object.keys( entryObj );
                let i = ownProps.length;
                const resArray = new Array(i); // preallocate the Array
                while (i--) {
                    resArray[i] = [ownProps[i], entryObj[ownProps[i]]];
                }

                return resArray;
            };
        }

        if (typeof obj.params !== 'undefined') {
            let Params = new HttpParams();
            Object.entries(obj.params).forEach(
                ([key, value]) => Params = Params.append(key, String(value))
            );

            body.params = Params;
        }

        if (typeof obj.headers !== 'undefined') {
            body.headers = this.createHeders(obj.headers);
        }

        if (typeof obj.headers !== 'undefined') {
            this.createHeders(obj.headers);
        }

        return new Promise(resolve => {
            this.http.get(apiUrl, body)
            .pipe (
              catchError(this.handleError)
            )
            .subscribe(
                data => resolve(data),
                // data => resolve(this.extractData(data)),
                err => this.logError(err)
            );
        });
    }

    /**
    * @param Object {url, params}
    * @return Callback Function
    */
    post(obj: any): Promise<any> {
        const apiUrl = obj.url;
        const params = obj.params;

        const body: any = {};
        body.observe = 'response';

        if (typeof obj.headers !== 'undefined') {
            body.headers = this.createHeders(obj.headers);
        }

        return new Promise(resolve => {
            this.http.post(apiUrl, params,  body)
            .subscribe(
                data => resolve(data),
                err => this.logError(err)
            );
        });
    }

    /**
    * @param Object {url, params}
    * @return Callback Function
    */
    delete(obj: any): Promise<any> {
        const apiUrl = obj.url;
        const params = obj.params;
        const body: any = {};
        body.observe = 'response';

        if (typeof obj.headers !== 'undefined') {
            body.headers = this.createHeders(obj.headers);
        }

        return new Promise(resolve => {
            this.http.post(apiUrl, params,  body)
            .subscribe(
                data => resolve(data),
                err => this.logError(err)
            );
        });
    }


    /**
    * @param Object {url, params}
    * @return Callback Function
    */
    update (obj: any): Promise<any> {
        const apiUrl = obj.url;
        const params = obj.params;
        const body: any = {};
        body.observe = 'response';

        if (typeof obj.headers !== 'undefined') {
            body.headers = this.createHeders(obj.headers);
        }

        return new Promise(resolve => {
            this.http.post(apiUrl, params,  body)
            .subscribe(
                data => resolve(data),
                err => this.logError(err)
            );
        });
    }


    /**
    * @param Object headers : headers {k1:v1, k2:v2....}
    */
    private createHeders (headers: HttpHeaders) {
        let header = new HttpHeaders (); // { 'Content-Type': 'application/json' }

        if (!Object.entries) {
            Object.entries = ( entryObj: any ) => {
                const ownProps = Object.keys( entryObj );
                let i = ownProps.length;
                const resArray = new Array(i); // preallocate the Array
                while (i--) {
                    resArray[i] = [ownProps[i], entryObj[ownProps[i]]];
                }
                return resArray;
            };
        }

        Object.entries(headers).forEach (
            ([key, value]) => header = header.append(key, String(value))
        );

        return header;
    }

    private extractData(res: any) {
        try {
            if ( typeof res.constructor !== 'undefined' && res.constructor.name === 'HttpResponse') {
                return res.body;
            } else {
                const body = res.json();
                return body || {};
            }
        } catch (e) {
            return res._body;
        }
    }

    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            errMsg = '';
        } else {
            errMsg = error.message ? error.message : error.toString();
        }

        return throwError(errMsg);
    }

    private logError (err: string) {
        console.error('There was an error: ' + err);
    }
}
