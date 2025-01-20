import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormErrorDirective } from '../../directives/field-error.directive';

@Component({
  selector: 'app-dynamic-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormErrorDirective],
  templateUrl: './dynamic-field.component.html',
  styleUrl: './dynamic-field.component.css'
})
export class DynamicFieldComponent {
  @Input() field!: { key: string; label: string; type: string };
  private _form!: FormGroup;

  get form(): FormGroup {
    return this._form;
  }

  @Input() set form(value: FormGroup) {
    this._form = value;
    this.updateControl();
  }

  control!: FormControl;

  ngOnInit() {
    this.updateControl();
  }

  private updateControl() {
    if (this._form) {
      this.control = this._form.get(this.field.key) as FormControl;
    }
  }
}