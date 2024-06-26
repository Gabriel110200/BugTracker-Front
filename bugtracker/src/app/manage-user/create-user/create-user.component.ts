import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  isLinear = false;
  firstFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      emailCtrl: ['', [Validators.required, Validators.email]],
      passwordCtrl: ['', Validators.required],
      typeCtrl: ['', Validators.required]
    });
  }

  submit() {
    if (this.firstFormGroup.valid) {
      console.log(this.firstFormGroup.value);
    } else {
      console.log('Form is invalid');
    }
  }


}
