import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpEventType, HttpEvent } from '@angular/common/http';

import { tap, map, last, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public localKoaHost = '/localkoa';

  public flomoApi = '/flomoapp'; // 'https://flomoapp.com'

  // 上传文件  获取进度
  uploadTest(file) {
    const body = new FormData();
    body.append('file', file);
    const req = new HttpRequest('POST', `${this.localKoaHost}/upload`, body, {
      reportProgress: true,
    });
    console.log(req);

    return this.http.request(req).pipe(
      map(event => this.getEventMessage(event, file)),
      tap(message => message),
      // last(), // return last (completed) message to caller
      // catchError(this.handleError(file))
    );
  }
  private getEventMessage(event: HttpEvent<any>, file: File) {
    switch (event.type) {
      case HttpEventType.Sent:
        return `Uploading file "${file.name}" of size ${file.size}.`;
      case HttpEventType.UploadProgress:
        // Compute and show the % done:
        const percentDone = Math.round(100 * event.loaded / event.total);
        return `File "${file.name}" is ${percentDone}% uploaded.`;
      case HttpEventType.Response:
        return `File "${file.name}" was completely uploaded!`;
      default:
        return `File "${file.name}" surprising upload event: ${event.type}.`;
    }
  }

  // flomoApiTest(text) {
  //   const body = {
  //     content: text
  //   };
  //   return this.http.post(`${this.flomoApi}/iwh/MjQzNjkx/6aeb8b10ed430a239b10f2c3b9163b47/`, body);
  // }

}
