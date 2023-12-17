import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserServiceService } from '../services/user-service.service';
import { User } from '../model/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registrationForm!: FormGroup; 
  
  constructor(private spinner: NgxSpinnerService,private fb: FormBuilder,private userService: UserServiceService) 
  {
    
  }
  
  ngOnInit(): void {
    this.initializeForm();

 
    
    
  }

  initializeForm(){
    this.registrationForm = this.fb.group({
      name: ['',Validators.required],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]],
      confirmPassword: ['',Validators.required]
    });
    
  }

  
  onSubmit()
  {
    if(this.registrationForm.valid){
      this.spinner.show();
      const user: User = {
        mail: this.registrationForm.get('email')?.value,
        password: this.registrationForm.get('password')?.value,
        userName: this.registrationForm.get('username')?.value
      }
      
      this.userService.registerUser(user).subscribe(
        (res) => {
          console.log(res);
          Swal.fire('Success!', 'Your operation was successful!', 'success');
          this.spinner.hide();
        },
        (error) => {
          console.error(error);
          Swal.fire('Error!', 'Something went wrong!', 'error');
          this.spinner.hide();
        }
      );

    }

  }

}
