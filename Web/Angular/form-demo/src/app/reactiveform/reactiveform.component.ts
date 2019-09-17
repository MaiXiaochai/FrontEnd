import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-reactiveform',
  templateUrl: './reactiveform.component.html',
  styleUrls: ['./reactiveform.component.css']
})
export class ReactiveformComponent implements OnInit {
  // Initial value，初始值
  username: FormControl = new FormControl('Initial value');
  dateRange: FormGroup = new FormGroup({
    from: new FormControl(),
    to: new FormControl()
  });
  emails: FormArray = new FormArray([
    new FormControl('a@a.com'),
    new FormControl('b@b.com'),
    new FormControl('b@b.com'),
  ]);
  constructor() { }

  ngOnInit() {
  }

}
