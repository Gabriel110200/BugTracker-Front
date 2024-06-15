import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CreateProjectComponent } from './create-project.component';
import { ProjectService } from 'src/app/services/projects/project.service';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';

describe('CreateProjectComponent', () => {
  let component: CreateProjectComponent;
  let fixture: ComponentFixture<CreateProjectComponent>;
  let projectService: any;

  beforeEach(async () => {
    const projectServiceMock = {
      registerProject: jasmine.createSpy('registerProject')
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CreateProjectComponent],
      providers: [
        FormBuilder,
        { provide: ProjectService, useValue: projectServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateProjectComponent);
    component = fixture.componentInstance;
    projectService = TestBed.inject(ProjectService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.firstFormGroup.valid).toBeFalsy();
  });

  it('name field validity', () => {
    let name = component.firstFormGroup.controls['firstCtrl'];
    expect(name.valid).toBeFalsy();
    name.setValue("");
    expect(name.hasError('required')).toBeTruthy();
  });

  it('should call the registerProject service on submit', () => {
    expect(component.firstFormGroup.valid).toBeFalsy();
    component.firstFormGroup.controls['firstCtrl'].setValue('Test Project');
    component.firstFormGroup.controls['descriptionCtrl'].setValue('A test project description');
    component.firstFormGroup.controls['statusCtrl'].setValue('1');
    expect(component.firstFormGroup.valid).toBeTruthy();

    projectService.registerProject.and.returnValue(of({status: 200}));

    component.submit();
    expect(projectService.registerProject).toHaveBeenCalled();
  });

  it('should handle errors during project registration', () => {
    component.firstFormGroup.controls['firstCtrl'].setValue('Test Project');
    component.firstFormGroup.controls['descriptionCtrl'].setValue('A test project description');
    component.firstFormGroup.controls['statusCtrl'].setValue('1');


    projectService.registerProject.and.returnValue(throwError(() => new Error('An error occurred')));

    spyOn(console, 'error');
    spyOn(Swal, 'fire'); 

    component.submit();
    expect(projectService.registerProject).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Error:', jasmine.any(Error));
    expect(Swal.fire).toHaveBeenCalledWith('Error', 'Houve um erro ao criar o projeto.', 'error');
  });
});
