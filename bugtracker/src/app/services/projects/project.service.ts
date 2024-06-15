import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseUrl = 'https://localhost:5001/api/Project';

  constructor(private http: HttpClient) { }

  registerProject(project: any): Observable<any> {
    const url = `${this.baseUrl}/CreateProject`
    return this.http.post(url, project);
  }


  listProjects(): Observable<any> {
    const url = `${this.baseUrl}/list`
    return this.http.get(url);
  }

  deleteProject(id: any): Observable<any> {
    const url = `${this.baseUrl}/` + id;
    return this.http.delete(url, { responseType: 'text' });
  }

}
