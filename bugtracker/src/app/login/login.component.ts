import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm!: FormGroup;

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.LoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLoginClick() {
    console.log(this.LoginForm);

    const login = {
      mail: this.LoginForm.get('email')?.value,
      password: this.LoginForm.get('password')?.value
    };

    this.spinner.show();

    this.userService.login(login).subscribe(
      (res) => {
        console.log(res);
        this.spinner.hide();

        localStorage.setItem('userID', res.userId);

        document.body.style.backgroundColor = 'white';
        Swal.fire('Success!', 'Login realizado com sucesso!', 'success');
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error(error);
        Swal.fire('Erro!', "Não foi possível efetuar o login", 'error');
        this.spinner.hide();
      }
    );
  }
}
