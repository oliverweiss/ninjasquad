import { NgControl } from '@angular/forms';
import { ContentChild, Directive, HostBinding } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '.form-group'
})
export class FormControlValidationDirective {

  @ContentChild(NgControl)
  ngControl: NgControl;

  constructor() { }

  @HostBinding('class.has-danger')
  get hasDanger(): boolean {
    return this.ngControl && this.ngControl.dirty && this.ngControl.invalid;
  }
}
