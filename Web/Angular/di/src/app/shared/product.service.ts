import { Injectable } from '@angular/core';
import {LoggerService} from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(public logger: LoggerService) { }
  getProduct(): Product {
    this.logger.log('getPoduct方法被调用');
    // 这里为了演示，不会去查询数据库，而是直接实例化一个对象
    return new Product(0, 'iPhoneX', 5899, '刘海屏');
  }
}

// 定义一个用来封装商品信息的类
export class Product {
  constructor(
    public id: number,
    public title: string,
    public price: number,
    public desc: string
  ) {}
}
