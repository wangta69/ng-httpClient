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

    private get_exchange_rate(){
        this.http.get({url:'what you want'}, function(data){
            console.log(data)
        }.bind(this));
    }
}
```
