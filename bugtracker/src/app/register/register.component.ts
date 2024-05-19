import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserServiceService } from '../services/user-service.service';
import { User } from '../model/user.model';
import { Route } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registrationForm!: FormGroup; 
  
  constructor(private spinner: NgxSpinnerService,
              private fb: FormBuilder,
              private userService: UserServiceService) 
  {
  }
  
  ngOnInit(): void {
    this.initializeForm();

 
    
    
  }

  initializeForm(){
    this.registrationForm = this.fb.group({
      userName: ['',Validators.required],
      email: ['',[Validators.required, Validators.email]],
      companyName: ['',Validators.required], 
      cnpj: ['',Validators.required],
      password: ['',[Validators.required, Validators.minLength(6)]],
      confirmPassword: ['',Validators.required]
    });
    
  }

  
  onSubmit()
  {

    console.log('submeteu');
    console.log(this.registrationForm);

    if(this.registrationForm.valid){


      if(this.registrationForm.get('password')?.value != this.registrationForm.get('confirmPassword')?.value){
        Swal.fire('Erro!', "Sua senha não confere", 'error');

      }
      else {
      this.spinner.show();
      const user: User = {
        mail: this.registrationForm.get('email')?.value,
        password: this.registrationForm.get('password')?.value,
        userName: this.registrationForm.get('userName')?.value,
        companyName: this.registrationForm.get('companyName')?.value,
        cnpj: this.registrationForm.get('cnpj')?.value,
      }

      this.userService.registerUser(user).subscribe(
        (res) => {
          console.log(res);
          Swal.fire('Success!', 'Registro realizado com sucesso!', 'success');
          this.spinner.hide();

        },
        (error) => {
          console.error(error);
          Swal.fire('Erro!', "Não foi possível efetuar o registro", 'error');
          this.spinner.hide();
        }
      );
    }

    }
    else 
    {
       Swal.fire('Aviso!', 'Por favor, preencha todos os campos!', 'warning')
    }

  }

}
