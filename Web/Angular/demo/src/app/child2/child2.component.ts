import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-child2',
  templateUrl: './child2.component.html',
  styleUrls: ['./child2.component.css']
})
export class Child2Component implements OnInit, AfterViewInit, AfterViewChecked {
  ngAfterViewInit(): void {
    console.log('子组件的视图初始化完毕');
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewChecked(): void {
    console.log('子组件的视图变更检测完毕');
  }
  constructor() { }

  ngOnInit() {
  }
  greeting(name: string) {
    console.log('hello' + name);
  }
}
