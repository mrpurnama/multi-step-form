import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    // Check if the value contains any numeric characters
    const hasNumber = /\d/.test(value);
    return hasNumber ? { noNumber: true } : null;
  };
}