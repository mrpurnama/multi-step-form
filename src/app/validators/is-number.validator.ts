import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function isNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const isValidNumber = !isNaN(value) && value !== null && value !== '';
    return isValidNumber ? null : { isNumber: true };
  };
}