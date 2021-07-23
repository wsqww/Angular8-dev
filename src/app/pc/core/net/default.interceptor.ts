import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, of, EMPTY } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 不满足条件 则不进行拦截
    if (false) { return EMPTY; }
    // 拦截
    return next.handle(req).pipe(
      mergeMap(event => {
        // 响应拦截
        if (event instanceof HttpResponse) {
          if ('处理返回的错误') {
            return this.handleDataError(event);
          }
          if ('重新请求') {
            console.log('jwt invalid');
            // 重置 JWT token
            const update: {
              // headers?: HttpHeaders;
              reportProgress?: boolean;
              // params?: HttpParams;
              responseType?: 'arraybuffer' | 'blob' | 'text' | 'json';
              withCredentials?: boolean;
              body?: any;
              method?: string;
              url?: string;
              setHeaders?: {};
              setParams?: {};
            } = {};
            const authReq = req.clone(update);
            return next.handle(authReq);
          }
        }
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => this.handleHttpError(err))
      // catchError((err: HttpErrorResponse) => {
      //   return this.handleHttpError(err);
      // })
    );
  }

  // 处理数据错误
  private handleDataError(event: HttpResponse<any> | HttpErrorResponse): Observable<any> {
    if (event instanceof HttpResponse) {
      // 处理 错误
    }
    // return of(event);
    throw event;
  }

  // 处理http错误
  private handleHttpError(event: HttpResponse<any> | HttpErrorResponse): Observable<any> {
    if (event.status === 200) {
      if (event instanceof HttpResponse) {
        throw event.body;
      }
    }

    confirm(`Http error（${event.status}）`);
    throw event;
  }
}
