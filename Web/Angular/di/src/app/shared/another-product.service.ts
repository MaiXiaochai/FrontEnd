import { Injectable } from '@angular/core';
import {Product, ProductService} from './product.service';
import {LoggerService} from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class AnotherProductService implements ProductService {

  getProduct(): Product {
    return new Product(1, 'iPhoneXS', 8999, '依然刘海屏');
  }
  // 因为 implements(实现) ProductService，所以，构造函数也要是一样的
  constructor(public logger: LoggerService) {}
}
