import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { File } from '../models/file';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private URL = `${environment.URL_API}`;

  constructor(
    private httpClient: HttpClient
  ) { }
  
  public list(): Observable<File> {
    return this.httpClient.get(`${this.URL}list`);
  }

  public save(file: File): Observable<any> {
    return this.httpClient.post(`${this.URL}create`, file);
  }

  public detail(id: number): Observable<File> {
    return this.httpClient.get<File>(`${this.URL}detail/${id}`);
  }

  public update(id: number, file: File): Observable<any> {
    return this.httpClient.put(`${this.URL}update/${id}`, file);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete(`${this.URL}delete/${id}`);
  }
}
