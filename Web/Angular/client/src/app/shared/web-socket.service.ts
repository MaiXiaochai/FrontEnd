import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  ws: WebSocket;

  constructor() { }

  createObservableSocket(url: string): Observable<any> {
    // ws会根据传入的url连接指定的服务器
    this.ws = new WebSocket(url);
    /* 定义一个流需要定义三件事:
      1)什么时候发射下一元素；
      2）什么时候抛一个异常；
      3）什么时候发射流结束的信号。
    */
    return new Observable(
      observer => {
        // WebSocket 接收到消息的时候，发送元素，元素为WebSocket接收到的事件里的数据
        this.ws.onmessage = (event) => observer.next(event.data);
        // 当WebSocket出现问题的时候，我的流抛出一个异常
        this.ws.onerror = (event) => observer.error(event);
        // 当WebSocket关闭的时候，我的流发出一个结束的信号
        this.ws.onclose = (event) => observer.complete();
      }
    );
  }
  sendMessage(message: string) {
    this.ws.send(message);
  }
}
