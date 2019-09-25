import { Component, OnInit } from '@angular/core';
import {WebSocketService} from '../shared/web-socket.service';

@Component({
  selector: 'app-web-socket',
  templateUrl: './web-socket.component.html',
  styleUrls: ['./web-socket.component.css']
})
export class WebSocketComponent implements OnInit {

  // 在Angular中，当想使用依赖注入的时候，要在app.module.ts中的provides中声明它的提供器
  constructor(private wsServer: WebSocketService) { }

  ngOnInit() {
    this.wsServer.createObservableSocket('ws://localhost:8085')
      .subscribe(
        data => console.log(data),
        err => console.log(err),
        () => console.log('流已经结束')
      );
  }
  sendMessageToServer() {
    this.wsServer.sendMessage('Hello -- from client');
  }
}
