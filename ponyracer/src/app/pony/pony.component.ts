import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { PonyModel } from '../models/pony.model';

@Component({
  selector: 'pr-pony',
  templateUrl: './pony.component.html',
  styleUrls: ['./pony.component.css']
})
export class PonyComponent implements OnInit {
  @Input()
  ponyModel: PonyModel;

  @Output()
  ponyClicked = new EventEmitter<PonyModel>();

  constructor() { }

  ngOnInit() {
  }

  getPonyImageUrl(): string {
    const color = this.ponyModel.color.toLowerCase();
    return `assets/images/pony-${color}.gif`;
  }

  clicked(): void {
    this.ponyClicked.emit(this.ponyModel);
  }
}
