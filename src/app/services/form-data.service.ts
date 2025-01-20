import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { noNumberValidator } from '../validators/no-number.validator';
import { isNumberValidator } from '../validators/is-number.validator';
import { isNumberPositiveValidator } from '../validators/is-number-positive.validator';

@Injectable()
export class FormDataService {
  fieldGroups: string[] = ['step1', 'step2', 'step3'];

  fields: {
    key: string;
    label: string;
    type: string;
    validators: { [key: string]: boolean | RegExp | number };
  }[][] = [
    [
      {
        key: 'firstName',
        label: 'First name',
        type: 'text',
        validators: { required: true, noNumber: true },
      },
      {
        key: 'lastName',
        label: 'Last name',
        type: 'text',
        validators: { required: true, noNumber: true },
      },
      {
        key: 'age',
        label: 'Age',
        type: 'text',
        validators: { isNumber: true, isNumberPositive: true },
      },
    ],
    [
      {
        key: 'email',
        label: 'Email',
        type: 'email',
        validators: { required: true, email: true },
      },
      {
        key: 'phone',
        label: 'Phone number',
        type: 'text',
        validators: { required: true },
      },
    ],
    [
      {
        key: 'seat',
        label: 'Seat',
        type: 'text',
        validators: { required: true },
      },
      {
        key: 'food',
        label: 'Food',
        type: 'text',
        validators: { required: true },
      },
      {
        key: 'allergies',
        label: 'Allergies',
        type: 'text',
        validators: { required: true },
      },
    ],
  ];

  getFieldData() {
    return this.fields.map((groups) => {
      return groups.map((field) => {
        const validators: Validators[] = [];
        if(field.validators['isNumber']) validators.push(isNumberValidator())
        if(field.validators['isNumberPositive']) validators.push(isNumberPositiveValidator())
        if(field.validators['required']) validators.push(Validators.required)
        if(field.validators['noNumber']) validators.push(noNumberValidator())
        if(field.validators['email']) validators.push(Validators.email)
        if(field.validators['pattern']) validators.push(Validators.pattern(field.validators['pattern'] as RegExp))
        return {...field, validators}
      });
    });
  }

  getFieldGroupData() {
    return this.fieldGroups;
  }
}
