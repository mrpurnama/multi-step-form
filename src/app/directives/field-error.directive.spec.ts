import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormErrorDirective } from './field-error.directive';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    standalone:true,
  template: `
    <input [formControl]="control" appFormError>
  `
})
class TestHostComponent {
  control = new FormControl('', [Validators.required, Validators.email, Validators.minLength(6)]);
}

fdescribe('FormErrorDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;
  let directiveEl: DebugElement;
  let directive: FormErrorDirective;
  let cdr: ChangeDetectorRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [TestHostComponent, FormErrorDirective],
      schemas: [NO_ERRORS_SCHEMA] 
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    directiveEl = fixture.debugElement.query(By.directive(FormErrorDirective));
    directive = directiveEl.injector.get(FormErrorDirective);
    cdr = fixture.debugElement.injector.get(ChangeDetectorRef);

    
    fixture.detectChanges();
  });

  it('should not show error messages initially', () => {
    const errorElement = directiveEl.nativeElement.querySelector('.text-danger');
    expect(errorElement).toBeNull();
  });

  it('should show "This field is required" when required validation fails', () => {
    component.control.markAsTouched();
    fixture.detectChanges();

    const errorElement = directiveEl.nativeElement.querySelector('.text-danger');
    expect(errorElement).toBeTruthy(); 
    expect(errorElement.textContent).toContain('This field is required');
  });

  it('should show "Invalid email address" when email validation fails', fakeAsync(() => { 
    component.control.setValue('invalid-email');
    component.control.markAsTouched();
    tick();
    fixture.detectChanges();

    const errorElement = directiveEl.nativeElement.querySelector('.text-danger');
    expect(errorElement).toBeTruthy();
    expect(errorElement.textContent).toContain('Invalid email address');
  }));

  it('should show "Minimum length is 6" when minlength validation fails', () => {
    component.control.setValue('abc');
    component.control.markAsTouched();
    fixture.detectChanges();

    const errorElement = directiveEl.nativeElement.querySelector('.text-danger');
    expect(errorElement).toBeTruthy();
    expect(errorElement.textContent).toContain('Minimum length is 6');
  });

  it('should clear error messages when the control becomes valid', () => {
    component.control.markAsTouched(); 
    fixture.detectChanges();
    expect(directiveEl.nativeElement.querySelector('.text-danger')).toBeTruthy();

    component.control.setValue('valid@email.com');
    fixture.detectChanges();
    expect(directiveEl.nativeElement.querySelector('.text-danger')).toBeNull();
  });

  it('should update error message when validation changes', () => {
    component.control.markAsTouched();
    fixture.detectChanges();

    component.control.setValidators([Validators.maxLength(5)]);
    component.control.updateValueAndValidity();
    fixture.detectChanges();

    const errorElement = directiveEl.nativeElement.querySelector('.text-danger');
    expect(errorElement).toBeTruthy();
    expect(errorElement.textContent).toContain('Maximum length is 5');
  });

  afterEach(() => {
    fixture.destroy(); 
  });
});