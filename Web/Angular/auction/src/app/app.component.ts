// 从 angular的core组件中引入Component装饰器
import { Component } from '@angular/core';
import {environment} from '../environments/environment';

// 用Component装饰器定义一个组件
// 下边的代码块叫做组件源数据装饰器
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// 普通的TypeScript类，告诉Angular AppComponent是一个组件，
// 要把源数据附加到该类上
// 整体理解，通过Component装饰器将源数据附加到 AppComponent类上
export class AppComponent {
  title = 'Auction';
  constructor() {
    console.log('环境名称：' + environment.envName);
  }
}
