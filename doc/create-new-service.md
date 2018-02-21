```
import { Injectable }			from '@angular/core';
import { RestHttpClient } from 'ng-rest-http';

@Injectable()
export class HttpService  {
	constructor(protected http: RestHttpClient) {}

    private default_url = 'https://your prefix domain';

	public post(obj:any, callback: Function) {
        obj.url = this.default_url+obj.url;

        if(typeof obj.headers != undefined)
            obj.headers = {};
        obj.headers.Authorization = 'auto add header';
        this.http.post(obj, callback);
	}

    public get(obj:any, callback: Function){
        obj.url = this.default_url+obj.url;

        if(typeof obj.headers != undefined)
            obj.headers = {};
        obj.headers.Authorization = 'auto add header';

        this.http.get(obj, callback);
    }

}

```
