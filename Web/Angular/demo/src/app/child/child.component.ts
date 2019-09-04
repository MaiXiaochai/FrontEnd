import {Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit, OnChanges, DoCheck {

  @Input()
  greeting: string;

  @Input()
  user: {name: string};

  message = '初始化消息';
  oldUserName: string;
  changeDetected = false;
  noChangeCount = 0;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(JSON.stringify(changes, null, 2));
  }

  ngDoCheck(): void {
    // user.name 有变更
    if (this.user.name !== this.oldUserName) {
      this.changeDetected = true;
      console.log('DoCheck: user.name从' + this.oldUserName + '变为' + this.user.name);
      this.oldUserName = this.user.name;
      this.noChangeCount = 0;
      // user.name 没有变更
    } else {
      this.noChangeCount += 1;
      console.log('DoCheck:user.name没变化时ngDoCheck方法已经被调用' + this.noChangeCount + '次');
    }
    this.changeDetected = false;
  }
}
