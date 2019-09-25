import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-destroy',
  templateUrl: './destroy.component.html',
  styleUrls: ['./destroy.component.css']
})
export class DestroyComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit() {}

  ngOnDestroy(): void {
    console.log('Destroy 组件被销毁');
  }
}
