import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlValidationDirective } from './form-control-validation.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    FormControlValidationDirective
  ],
  exports: [
    FormControlValidationDirective,
    NgbModule
  ]
})
export class SharedModule { }
