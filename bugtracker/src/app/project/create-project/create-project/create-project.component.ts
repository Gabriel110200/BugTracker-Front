import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/projects/project.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent {
  isLinear = false;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required], 
    descriptionCtrl: ['', Validators.required], 
    imageCtrl: [null], 
    visibilityCtrl: [true], 
    statusCtrl: ['', Validators.required] 
  });

  constructor(private _formBuilder: FormBuilder, private projectService: ProjectService) {}

  submit() {
    const projectData = {
      ProjectName: this.firstFormGroup.get('firstCtrl')?.value,
      description: this.firstFormGroup.get('descriptionCtrl')?.value,
      image: this.firstFormGroup.get('imageCtrl')?.value,
      visibility: this.firstFormGroup.get('visibilityCtrl')?.value,
      status: this.firstFormGroup.get('statusCtrl')?.value,
      userId: localStorage.getItem('userId')
    };

    this.projectService.registerProject(projectData).subscribe({
      next: (res) => {
        console.log(res);
        Swal.fire('Success!', 'Projeto criado com sucesso!', 'success');
      },
      error: (err) => {
        console.error('Error:', err);
        Swal.fire('Error', 'Houve um erro ao criar o projeto.', 'error');
      }
    });
  }
}
