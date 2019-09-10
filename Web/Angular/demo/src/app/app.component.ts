import {AfterContentChecked, AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Child2Component} from './child2/child2.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit, AfterViewInit, AfterViewChecked {
  constructor() {}
  // @ts-ignore
  @ViewChild('child11')
  child1: Child2Component;

  ngAfterViewInit(): void {
    console.log('父组件的视图初始化完毕');
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewChecked(): void {
    console.log('父组件的视图变更检测完毕');
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    setInterval(() => {
      this.child1.greeting('Tom');
      }, 5000);

  }

}
