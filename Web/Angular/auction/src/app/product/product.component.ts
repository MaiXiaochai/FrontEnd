import { Component, OnInit } from '@angular/core';
import {Product, ProductService} from '../shared/product.service';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  private products: Observable<Product[]>;
  constructor(private productService: ProductService) {}

  // ngOnInit 组件声明周期钩子中的一个钩子，会在组件实例化的时候被调用一次
  ngOnInit() {
    this.products = this.productService.getProducts();
    this.productService.searchEvent.subscribe(
      params => this.products = this.productService.search(params)
    );
  }
}
