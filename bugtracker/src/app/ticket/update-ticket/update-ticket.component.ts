import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { AddCategoryModalComponent } from 'src/app/add-category-modal/add-category-modal.component';
import { TicketPriority, TicketStatusEnum, TicketTypeEnum } from 'src/app/enum/ticket.enum';
import { Category } from 'src/app/interfaces/CategoryInterface';
import { Project } from 'src/app/interfaces/ProjectInterface';
import { Ticket } from 'src/app/model/ticket.model';
import { ProjectService } from 'src/app/services/projects/project.service';
import { TicketService } from 'src/app/services/tickets/ticket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-ticket',
  templateUrl: './update-ticket.component.html',
  styleUrls: ['./update-ticket.component.css']
})
export class UpdateTicketComponent {

  ticketForm!: FormGroup;
  projects: Project[] = [];
  isLinear: boolean = true;
  categories: Category[] = [];
  ticket: any;

  TicketStatusEnum = TicketStatusEnum;
  TicketPriority = TicketPriority;
  TicketTypeEnum = TicketTypeEnum;

  constructor(private _formBuilder: FormBuilder,
    private projectService: ProjectService,
     private ticketService: TicketService,
    private router: Router, 
    private dialog: MatDialog) {

      const navigation = this.router.getCurrentNavigation();
      this.ticket = navigation?.extras?.state;
      this.ticket = this.ticket.data; 
  
      console.log('ticket:> ');
      console.log(this.ticket['title']);


     }

    ngOnInit() {

      this.initializeForm();
      this.loadTicketData();  
    
      this.fetchProjects();
    
      this.ticketForm.get('type')?.valueChanges.subscribe(type => {
        if (type == TicketTypeEnum.Bug) {
          this.ticketForm.get('stepsToReproduce')?.setValidators([Validators.required]);
          this.ticketForm.get('expectedBehavior')?.setValidators([Validators.required]);
        } else {
          this.ticketForm.get('stepsToReproduce')?.clearValidators();
          this.ticketForm.get('expectedBehavior')?.clearValidators();
        }
        this.ticketForm.get('stepsToReproduce')?.updateValueAndValidity();
        this.ticketForm.get('expectedBehavior')?.updateValueAndValidity();
      });

    }

    initializeForm() {
      this.ticketForm = this._formBuilder.group({
        title: ['', Validators.required],
        priority: ['', Validators.required],
        status: ['', Validators.required],
        type: ['', Validators.required],
        message: ['', Validators.required],
        deadline: ['', Validators.required],
        projectId: ['', Validators.required],
        categoryName:[null],
        stepsToReproduce: [''],
        expectedBehavior: ['']
      });
    }



  loadTicketData() {

    console.log(this.ticket);

    this.ticketForm.patchValue({
      title: this.ticket?.title,
      priority: this.ticket?.priority,
      status: this.ticket?.status,
      type: this.ticket?.type,
      message: this.ticket?.description,
      deadline: this.ticket?.deadLine,
      projectId: this.ticket?.projectId_FK,
      categoryName: this.ticket?.categoryName,
      stepsToReproduce: this.ticket?.stepsToReproduce,
      expectedBehavior: this.ticket?.expectedBehavior
    });
  }

  fetchProjects() {
    this.projectService.listProjects().subscribe((res: Project[]) => {
      console.log('listProjects');
      console.log(res);
      this.projects = res;
    });
  }

  onTypeChange(event: MatSelectChange) {
    console.log('Selected Value:', event);


    this.ticketForm.get('type')?.valueChanges.subscribe(type => {
      if (type == TicketTypeEnum.Bug) {
        this.ticketForm.get('stepsToReproduce')?.setValidators([Validators.required]);
        this.ticketForm.get('expectedBehavior')?.setValidators([Validators.required]);
      } else {
        this.ticketForm.get('stepsToReproduce')?.clearValidators();
        this.ticketForm.get('expectedBehavior')?.clearValidators();
      }
      this.ticketForm.get('stepsToReproduce')?.updateValueAndValidity();
      this.ticketForm.get('expectedBehavior')?.updateValueAndValidity();
    });

  }

  get priorities() {
    return Object.keys(TicketPriority).filter(k => typeof TicketPriority[k as any] === "number");
  }

  get statuses() {
    return Object.keys(TicketStatusEnum).filter(k => typeof TicketStatusEnum[k as any] === "number");
  }

  get types() {
    return Object.keys(TicketTypeEnum).filter(k => typeof TicketTypeEnum[k as any] === "number");
  }

  openAddCategoryModal() {
    const dialogRef = this.dialog.open(AddCategoryModalComponent, {
      width: '250px',
      height: '300px'
    });

    dialogRef.afterClosed().subscribe((result: Category | null) => {
      console.log('The dialog was closed', result);
      if (result) {
        this.categories.push(result);
      }

    });
  }

  onSubmit() {
    if (this.ticketForm.valid) {
      const newTicket = this.ticketForm.value;



      this.ticketService.registerTicket(newTicket).subscribe({
        next: (response) => {
          Swal.fire('Success', 'Ticket criado com sucesso!', 'success'); 
          this.router.navigate(['/ticket']);
        },
        error: (error) => {
          console.error('Error creating ticket:', error);
          Swal.fire('Error', 'Error durante a criação de ticket', 'error');
        }
      });
    } else {
      for (const key of Object.keys(this.ticketForm.controls)) {
        this.ticketForm.controls[key].markAsTouched();
      }
      console.error('Form is not valid.');
    }
  }

}
