import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product, Comment, ProductService} from '../shared/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})

export class ProductDetailComponent implements OnInit {
  product: Product;
  comments: Comment[];
  newRating = 5;
  newComment = '';
  constructor(private routeInfo: ActivatedRoute,
              private productService: ProductService) { }

  ngOnInit() {
    // this.routeInfo.snapshot.params.productId 中的productId是路由中定义的
    const productId: number = this.routeInfo.snapshot.params.productId;
    this.product = this.productService.getProduct(productId);
    this.comments = this.productService.getCommentsForProductId(productId);
  }
}
