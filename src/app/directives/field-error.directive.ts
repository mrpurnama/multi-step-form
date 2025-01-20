import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appFormError]',
  standalone: true
})
export class FormErrorDirective {
  @Input('appFormError') control!: AbstractControl;
  @Input() fieldLabel!: string;

  private errorSpan!: HTMLElement;
  private controlSub? : Subscription

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    if(this.controlSub) this.controlSub.unsubscribe()
    this.controlSub = this.control.statusChanges.subscribe(() => {
        this.updateErrorMessages();
    });
    this.renderer.listen(this.el.nativeElement, 'blur', () => {
        this.control.markAsTouched();
        this.updateErrorMessages(); 
      });
    this.updateErrorMessages();
  }

  private updateErrorMessages() {
    if (this.errorSpan) {
      this.renderer.removeChild(this.el.nativeElement.parentNode, this.errorSpan);
    }

    if (this.control.invalid && (this.control.dirty || this.control.touched)) {
      this.errorSpan = this.renderer.createElement('div');
      this.renderer.addClass(this.errorSpan, 'error-message');
      
      const errors = this.control.errors as ValidationErrors;
      const firstErrorKey = Object.keys(errors)[0]; 
      const errorMessage = this.getErrorMessage(firstErrorKey, errors); 
      const text = this.renderer.createText(errorMessage);
      this.renderer.appendChild(this.errorSpan, text);

      this.renderer.insertBefore(this.el.nativeElement.parentNode, this.errorSpan, this.el.nativeElement.nextSibling); 
    }
  }

  private getErrorMessage(key: string, errors: ValidationErrors): string {
    switch (key) {
      case 'isNumber':
        return `${this.fieldLabel} must be a number`;
      case 'isNumberPositive':
        return `${this.fieldLabel} should be positive`;
      case 'required':
        return `${this.fieldLabel} is a required field`;
      case 'noNumber':
        return `${this.fieldLabel} should not contain numbers`;
      case 'pattern':
        return 'Invalid format';
      case 'email':
        return 'Email should have correct format';
      default:
        return 'Invalid input';
    }
  }

  ngOnDestroy(){
    this.controlSub?.unsubscribe()
  }
}