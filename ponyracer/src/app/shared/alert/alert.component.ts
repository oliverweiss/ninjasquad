import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'pr-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Output()
  close = new EventEmitter<void>();

  @Input()
  type: 'danger' | 'success' | 'warning' = 'warning';

  @Input()
  dismissible = true;

  constructor() { }

  ngOnInit() {
  }

  closeHandler() {
    this.close.emit();
  }

  get alertClasses(): string {
    return 'alert alert-' + this.type;
  }
}
