import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product, Comment, ProductService} from '../shared/product.service';
import {isAsciiLetter} from 'codelyzer/angular/styles/chars';

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
  isCommentHidden = true;

  constructor(private routeInfo: ActivatedRoute,
              private productService: ProductService) { }

  ngOnInit() {
    // this.routeInfo.snapshot.params.productId 中的productId是路由中定义的
    const productId: number = this.routeInfo.snapshot.params.productId;
    this.product = this.productService.getProduct(productId);
    this.comments = this.productService.getCommentsForProductId(productId);
  }
  addComment() {
    const comment = new Comment(
      0,
      this.product.id,
      new Date().toLocaleDateString(),
      'someone',
      this.newRating,
      this.newComment
      );

    this.comments.unshift(comment); // 向原评论数组添加新的评论元素

    // tslint:disable-next-line:no-shadowed-variable
    const sum = this.comments.reduce((sum, comment) => sum + comment.rating, 0); // 从 0 开始，依次加遍comments里的每个元素
    this.product.rating = sum / this.comments.length;

    this.newComment = null; // 评论提交后，新评论置空
    this.newRating = 5; // 评论提交后，恢复默认五星
    this.isCommentHidden = true; // 评论提交后，评论区隐藏起来
  }
}
