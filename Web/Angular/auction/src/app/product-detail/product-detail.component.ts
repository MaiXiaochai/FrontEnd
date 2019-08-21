import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productTitle: string;
  constructor(private routeInfo: ActivatedRoute) { }

  ngOnInit() {
    // 这里只会从商品列表页路由到商品详情页，而不会在商品详情页之间相互跳转，所以用snapshot
    this.productTitle = this.routeInfo.snapshot.params.prodTitle;
  }
}
