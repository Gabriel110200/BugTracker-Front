import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImpedimentService {

  private baseUrl = 'https://localhost:5001/api/Impediment';

  constructor(private http: HttpClient) { }

  getImpediments(ticketId: any) {
    const url = `${this.baseUrl}/{ticketId}`
    return this.http.get(url);
  }

  registerImpediment(impediment: any): any {
    const url = `${this.baseUrl}`
    return this.http.post(url, impediment);
  }
}
