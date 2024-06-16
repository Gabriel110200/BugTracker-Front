import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectModel } from 'src/app/model/project.model';
import { ProjectService } from 'src/app/services/projects/project.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  editFormGroup!: FormGroup;
  project: any;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    console.log(this.router.getCurrentNavigation());

    const navigation = this.router.getCurrentNavigation();
    this.project = navigation?.extras?.state;
    this.project = this.project.data; 

    console.log('project:> ');
    console.log(this.project['name']);

  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadProjectData();
  }

  initializeForm(): void {
    this.editFormGroup = this.fb.group({
      nameCtrl: ['', Validators.required],
      descriptionCtrl: ['', Validators.required],
      statusCtrl: ['', Validators.required],
      visibilityCtrl: [true, Validators.required]
    });
  }

  loadProjectData(): void {

    if (this.project) {

      console.log(this.project);

      this.editFormGroup.setValue({
        nameCtrl: this.project['name'],
        descriptionCtrl: this.project['description'],
        statusCtrl: this.project['status'].toString(),
        visibilityCtrl: this.project['isActive']
      });
    } else {
      Swal.fire('Error', 'No project data available.', 'error').then(() => {
        this.router.navigate(['/projects']);
      });
    }
  }
  submit(): void {
    if (this.editFormGroup.valid) {
      const nameCtrl = this.editFormGroup.get('nameCtrl');
      const descriptionCtrl = this.editFormGroup.get('descriptionCtrl');
      const statusCtrl = this.editFormGroup.get('statusCtrl');
  
      const updatedProject = {
        id: this.project.id ? this.project.id : null,
        name: nameCtrl ? nameCtrl.value : null,
        description: descriptionCtrl ? descriptionCtrl.value : null,
        status: statusCtrl ? statusCtrl.value : null
      }
      this.projectService.updateProject(updatedProject).subscribe({
        next: (res : any) => {
          Swal.fire('Success!', 'Projeto atualizado com sucesso!', 'success');
          this.router.navigate(['/projects']);
        },
        error: (err : any) => {
          Swal.fire('Error', 'Houve um erro ao atualizar o projeto: ' + err, 'error');
        }
      });
    }
  }
}
