import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-category-modal',
  templateUrl: './add-category-modal.component.html',
  styleUrls: ['./add-category-modal.component.css']
})
export class AddCategoryModalComponent {

  categoryForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      console.log(this.categoryForm.value);
      // Call service to save category, then close modal
    }
  }

}
