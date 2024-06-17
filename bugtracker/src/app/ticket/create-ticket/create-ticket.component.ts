import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from 'src/app/interfaces/ProjectInterface';
import { ProjectService } from 'src/app/services/projects/project.service';
import { Category } from 'src/app/interfaces/CategoryInterface';
import { AddCategoryModalComponent } from 'src/app/add-category-modal/add-category-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { TicketService } from 'src/app/services/tickets/ticket.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

enum TicketPriority {
  Low = 0,
  Medium = 1,
  High = 2,
  Urgent = 3
}

enum TicketStatusEnum {
  Ready = 0,
  InProgress = 1,
  CodeReview = 2,
  QA = 3,
  ReadyToProduction = 4,
  Done = 5
}

enum TicketTypeEnum {
  Feature = 0,
  Bug = 1
}

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit {
  ticketForm!: FormGroup;
  projects: Project[] = [];
  isLinear: boolean = true;
  categories: Category[] = [];

  TicketStatusEnum = TicketStatusEnum;
  TicketPriority = TicketPriority;
  TicketTypeEnum = TicketTypeEnum;

  constructor(private _formBuilder: FormBuilder,
    private projectService: ProjectService,
    private ticketService: TicketService,
    private router: Router, 
    private dialog: MatDialog) { }

    ngOnInit() {
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
