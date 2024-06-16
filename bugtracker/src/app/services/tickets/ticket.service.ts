import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private baseUrl = 'https://localhost:5001/api/Ticket';

  constructor(private http: HttpClient) {}

  registerTicket(ticket: any): Observable<any>{
    const url = `${this.baseUrl}`
    return this.http.post(url,ticket);
  }

  updateTicket(ticket: any): Observable<any>{
    const url = `${this.baseUrl}`
    return this.http.put(url,ticket);
  }

  deleteTicket(id: any): Observable<any>{
    const url = `${this.baseUrl}/${id}`; 
    return this.http.delete(url, { responseType: 'text' });
  }

  getTickets():Observable<any>{
    const url = `${this.baseUrl}`
    return this.http.get(url);
  }


}
