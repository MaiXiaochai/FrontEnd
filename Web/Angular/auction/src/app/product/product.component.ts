import { Component, OnInit } from '@angular/core';
import {Product, ProductService} from '../shared/product.service';
import {FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  private products: Product[];
  private keyword: string;
  private titleFilter: FormControl = new FormControl();
  constructor(private productService: ProductService) {
    this.titleFilter.valueChanges
      .pipe(debounceTime(500))
      .subscribe(
        value => this.keyword = value
      );
  }

  // ngOnInit 组件声明周期钩子中的一个钩子，会在组件实例化的时候被调用一次
  ngOnInit() {
    this.products = this.productService.getProducts();
  }
}


