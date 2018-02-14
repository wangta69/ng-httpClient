import { NgModule }     from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RestHttpClient } from './http.service';

@NgModule({
  imports: [ HttpClientModule ],
  providers:[ RestHttpClient ]
})
export class RestHttpClientModule {}
