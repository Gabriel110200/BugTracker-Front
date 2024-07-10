import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketService } from '../services/tickets/ticket.service';
import { Ticket } from '../model/ticket.model';
import { Router } from '@angular/router';
import { TicketTypeEnum,TicketStatusEnum,TicketPriority } from '../enum/ticket.enum';
import { ImpedimentService } from '../services/impediment/impediment.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent {

  tickets: any[] = [];
  ticketForm!: FormGroup;
  impedimentForm!: FormGroup;
  displayedColumns: string[] = ['name', 'status', 'type', 'description', 'actions'];

  TicketTypeEnum = TicketTypeEnum;
  TicketStatusEnum = TicketStatusEnum;

  constructor(private fb: FormBuilder, 
              private ticketService: TicketService,
              private router: Router, 
              private impedimentService: ImpedimentService) { }

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

    this.impedimentForm = this.fb.group({
      projectName: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]], 
      ticketId: []
    });

  }

  onEdit(ticket: Ticket) {

    console.log(ticket);

    this.router.navigate(['/edit-ticket'], { state: { data: ticket } });
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
    const impediment = this.impedimentForm.value;

    this.impedimentService.registerImpediment(impediment).subscribe({
      next: (response) => {
        Swal.fire('Success', 'Impediment criado com sucesso!', 'success'); ;
      },
      error: (error) => {
        Swal.fire('Error', 'Erro ao criar impediment', 'error');
      }
    });

    console.log(this.impedimentForm);

 
  }

}
