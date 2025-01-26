import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    @Inject(String)
    protected url: string = 'THIS SHOULD BE OVERWRITTEN BY THE SERVICE ',
    @Inject(String) protected endpoint: string = 'THATS EXTENDING THIS SERVICE',
    protected httpClient: HttpClient
  ) {
  }

  Create(payload: any) {
    return this.httpClient.post(`${this.url}${this.endpoint}`, payload, {
      observe: 'response',
      responseType: 'json',
    });
  }

  Read(id: any) {
    return this.httpClient.get(`${this.url}${this.endpoint}/${id}`, {
      headers: new HttpHeaders({'X-Request-Uri': location.href}),
      observe: 'response',
      responseType: 'json',
    });
  }

  ReadAll() {
    return this.httpClient.get(`${this.url}${this.endpoint}`, {
      headers: new HttpHeaders({'X-Request-Uri': location.href}),
      observe: 'response',
      responseType: 'json',
    });
  }

  Update(payload: any) {
    return this.httpClient.patch(
      `${this.url}${this.endpoint}/`, payload, {
        observe: 'response',
        responseType: 'json',
      });
  }

  Delete(id: any) {
    return this.httpClient.delete(`${this.url}${this.endpoint}/${id}`, {
      observe: 'response',
      responseType: 'json',
    });
  }

  DeleteAll() {
    return this.httpClient.delete(`${this.url}${this.endpoint}`);
  }
}
