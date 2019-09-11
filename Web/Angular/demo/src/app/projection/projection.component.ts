import {AfterContentChecked, AfterContentInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-projection',
  templateUrl: './projection.component.html',
  styleUrls: ['./projection.component.css']
})
export class ProjectionComponent implements OnInit, AfterContentInit, AfterContentChecked {

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentChecked(): void {
    console.log('子组件件投影内容变更检测完毕');
  }

  ngAfterContentInit(): void {
    console.log('子组件投影内容初始化完毕');
  }

}
