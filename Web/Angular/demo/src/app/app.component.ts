import {AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Child2Component} from './child2/child2.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked {
  private message: string;

  constructor() {}
  // @ts-ignore
  @ViewChild('child11')
  child1: Child2Component;
  divContent = '<div>投影</div>';

  ngAfterContentInit(): void {
    this.message = 'Hello World!';
    console.log('父组件投影内容初始化完毕');
  }

  ngAfterContentChecked(): void {
    console.log('父组件投影内容变更检测完毕');
    }

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
      }, 50000);

  }
}
