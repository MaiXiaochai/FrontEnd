import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


export interface TopMenu {
  title: string;
  // link？ 表示link为可选参数
  link?: string;
}


@Component({
  selector: 'app-scrollable-tab',
  templateUrl: './scrollable-tab.component.html',
  styleUrls: ['./scrollable-tab.component.css']
})
export class ScrollableTabComponent implements OnInit {
  // 设置 selectedIndex 初始值 = -1，
  selectedIndex = -1;

  @Input()
  menus: TopMenu[] = [];
  @Input()
  backgroundColor = '#fff';
  @Input()
  titleActiveColor = 'yellow';
  @Input()
  titleColor = 'blue';
  @Input()
  indicatorColor = 'brown';
  @Output()
  // tabSelectedEmitter 被定义成了本组件的一个事件，
  //  在引用本组件的标签内，可以直接使用该事件，就像 (click) 一样的使用模式
  tabSelectedEmitter = new EventEmitter();


  handleSelection(index: number) {
    this.selectedIndex = index;
    // 当被点击时，向外（其实是给父元素）发射一个数据，发射当前的元素，
    // 比如，{ title: '热门', link: ''}
    this.tabSelectedEmitter.emit(this.menus[this.selectedIndex]);
  }

  // 给trackBy 使用的函数
  trackByIndex(index, item) {
    return index;
  }
  constructor() { }

  ngOnInit() {
  }
}
