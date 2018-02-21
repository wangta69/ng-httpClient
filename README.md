# ng-rest-http

Tested for angular5

## Installation
```
npm install ng-rest-http
```

## How to use
``` app.module.ts
import { RestHttpClientModule } from 'ng-rest-http'
@NgModule({
    imports: [ RestHttpClientModule ]
})

```

``` app.componet.ts
import { RestHttpClient } from 'ng-rest-http'

export class AComponent{
    constructor(protected http:RestHttpClient){}

    private api_url = 'http://sample.domain.com/api/what';
    private params = {arg1:'arg'.....};
    private headers = {'Authorization: 'Bearer token'}

    private get_sample(){
        this.http.get({'url':api_url, 'params':params, 'headers':headers}, function(data){
            console.log(data)
        }.bind(this));
    }

    private post_sample(){
        this.http.post({'url':api_url, 'params':params, 'headers':headers}, function(data){
            console.log(data)
        }.bind(this));
    }
}
```

11111[a relative link](wangta69/ng-httpClient/doc/create-new-service.md) 22222
