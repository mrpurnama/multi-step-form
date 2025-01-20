import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function isNumberPositiveValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const isValidPositiveNumber = !isNaN(value) && value > 0;
    return isValidPositiveNumber ? null : { isNumberPositive: true };
  };
}