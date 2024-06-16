import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketService } from '../services/tickets/ticket.service';
import { Ticket } from '../model/ticket.model';
import { Router } from '@angular/router';
import { TicketTypeEnum,TicketStatusEnum,TicketPriority } from '../enum/ticket.enum';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent {

  tickets: any[] = [];
  ticketForm!: FormGroup;
  displayedColumns: string[] = ['name', 'status', 'type', 'description', 'actions'];

  TicketTypeEnum = TicketTypeEnum;
  TicketStatusEnum = TicketStatusEnum;

  constructor(private fb: FormBuilder, private ticketService: TicketService,private router: Router) { }

  ngOnInit() {
    this.initializeForm();
    this.fetchTickets();
  }

  fetchTickets() {

    this.ticketService.getTickets().subscribe((tickets: any[]) => { 

      console.log(tickets);

      this.tickets = tickets;



     });

  }


  getEnumLabel(enumObj: any, value: number): string {
    return Object.keys(enumObj).find(key => enumObj[key] === value);
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

  onAdd(){
    this.router.navigate(['/create-ticket']);
  }

  onDelete(index: number) {

    this.ticketService.deleteTicket(this.tickets[index].id).subscribe((res: any) => {

      Swal.fire('Success', 'Ticket deletado com sucesso!', 'success');
      this.fetchTickets();

    })

  }

  onSubmit() {
    if (this.ticketForm.valid) {
      const newTicket: Ticket = this.ticketForm.value;
      this.tickets.push(newTicket);
      this.ticketForm.reset();
    }
  }

}
