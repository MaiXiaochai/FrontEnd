import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

// 如果想使用WebSocketService，别忘了在 app.module.ts 的 providers中声明
export class WebSocketService {
  ws: WebSocket;

  constructor() { }

  createObservableSocket(url: string, id: number): Observable<any> {
    this.ws = new WebSocket(url);
    return new Observable<string>(
      observer => {
        this.ws.onmessage = (event) => observer.next(event.data);
        this.ws.onerror = (event) => observer.error(event);
        this.ws.onclose = (event) => observer.complete();
        // onopen,当WebSocket连接打开的时候，发送商品id给服务器
        this.ws.onopen = (event) => this.sendMessage({productId: id});
        // 关闭ws连接，使得后台的随机数增长也停止
        return () => this.ws.close.bind(this.ws);
      }
      // @ts-ignore
    ).pipe(map(message => JSON.parse(message)));
  }

  sendMessage(message: any) {
    // 转成json的字符串发出去
    this.ws.send(JSON.stringify(message));
  }
}
