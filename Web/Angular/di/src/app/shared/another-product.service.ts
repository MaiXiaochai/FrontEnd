import { Injectable } from '@angular/core';
import {Product, ProductService} from './product.service';

@Injectable({
  providedIn: 'root'
})
export class AnotherProductService extends ProductService {

  getProduct(): Product {
    return new Product(1, 'iPhoneXS', 8999, '依然刘海屏');
  }
}
