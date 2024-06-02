import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Ticket {
  name: string;
  status: string;
  description: string;
}

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent {

  tickets: Ticket[] = [];
  ticketForm!: FormGroup;
  displayedColumns: string[] = ['name', 'status', 'description', 'actions'];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
    this.fetchTickets();
  }

  fetchTickets() {
    // Fetch the tickets from your service or API
    // For demonstration, we're using static data
    this.tickets = [
      { name: 'Ticket 1', status: 'Em Andamento', description: 'teste' },
      { name: 'Ticket 2', status: 'Concluído', description: 'teste' },
      { name: 'Ticket 3', status: 'Em Espera', description: 'teste' },
      { name: 'Ticket 4', status: 'Bloqueado', description: 'teste' },
    ];
  }

  initializeForm() {
    this.ticketForm = this.fb.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onEdit(ticket: Ticket) {
    // Handle the edit action
  }

  onDelete(index: number) {
    this.tickets.splice(index, 1);
  }

  onSubmit() {
    if (this.ticketForm.valid) {
      const newTicket: Ticket = this.ticketForm.value;
      this.tickets.push(newTicket);
      this.ticketForm.reset();
    }
  }

}
