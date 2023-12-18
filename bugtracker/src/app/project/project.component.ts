import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projectForm!: FormGroup;

  constructor(private fb: FormBuilder, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.projectForm = this.fb.group({
      projectName: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit() {

    console.log(this.projectForm);

    if (this.projectForm.valid) {

      console.log('foi');
      this.spinner.show();
      
      setTimeout(() => {
        
        this.spinner.hide();
        Swal.fire('Success!', 'Projeto registrado com sucesso!', 'success');
      }, 2000); 
    } else {
     
    }
  }
}
