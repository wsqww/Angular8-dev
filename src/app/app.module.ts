import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// 请求拦截器
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DefaultInterceptor } from '@core';
const INTERCEPTOR_PROVIDES = [
  { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
];


import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';
import { RoutesModule } from '@routes/routes.module';
import { LayoutModule } from '@layout/layout.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    CoreModule,
    RoutesModule,
    LayoutModule,
    SharedModule,
  ],
  providers: [INTERCEPTOR_PROVIDES],
  bootstrap: [AppComponent]
})
export class AppModule { }
