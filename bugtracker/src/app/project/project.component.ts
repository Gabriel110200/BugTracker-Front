import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProjectService } from '../services/projects/project.service';
import Swal from 'sweetalert2';

interface Project {
  id: string;
  name: string;
  description: string;
  isActive?: boolean;
  status?: number;
}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projectForm!: FormGroup;
  projects: Project[] = [];
  displayedColumns: string[] = ['name', 'description', 'actions'];

  constructor(private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private projectService: ProjectService) { }

  ngOnInit() {
    this.initializeForm();
    this.fetchProjects();
  }

  fetchProjects() {
    this.projectService.listProjects().subscribe((res: Project[]) => {
      console.log('listProjects');
      console.log(res);
      this.projects = res;
    });
  }

  initializeForm() {
    this.projectForm = this.fb.group({
      projectName: ['', Validators.required],
      description: ['', Validators.required],
      Image: [null],
      UserId: [null]
    });
  }

  onDelete(index: number) {

    this.spinner.show();

    this.projectService.deleteProject(this.projects[index].id).subscribe(res => {

      Swal.fire('Success!', 'Registro Apagado com sucesso!', 'success');
      this.spinner.hide();
      this.fetchProjects();
          
    }); 

  }

  onSubmit() {
    let userId = localStorage.getItem('userId');
    this.projectForm.patchValue({ UserId: userId });

    const project = {

      ProjectName: this.projectForm.get('projectName')?.value,
      UserId: userId,
      Description: this.projectForm.get('description')?.value
    
    };

    this.spinner.show();
    this.projectService.registerProject(project).subscribe(res => {
      Swal.fire('Success!', 'Projeto registrado com sucesso!', 'success');
      this.fetchProjects();
      this.spinner.hide();
    });
  }

  onEdit(project: Project) {
    // Implement edit functionality if needed
  }
}
