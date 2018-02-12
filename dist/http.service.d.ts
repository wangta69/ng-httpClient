import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
export declare class RestHttpClient {
    private http;
    private apiUrl;
    constructor(http: HttpClient);
    /**
    * @return Json
    */
    getapi(obj: any, callback: Function): void;
    /**
    * @return String
    */
    directget(obj: any, callback: Function): void;
    postapi(obj: any, callback: Function): void;
    private extractData(res);
    private handleError(error);
    private logError(err);
}
