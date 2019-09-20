import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product, Comment, ProductService} from '../shared/product.service';
import {WebSocketService} from '../shared/web-socket.service';

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
  isWatched = false;
  currentBid: number;

  constructor(private routeInfo: ActivatedRoute,
              private productService: ProductService,
              private wsService: WebSocketService) { }

  ngOnInit() {
    // this.routeInfo.snapshot.params.productId 中的productId是路由中定义的
    const productId: number = this.routeInfo.snapshot.params.productId;
    this.productService.getProduct(productId).subscribe(
      /* 这里，product这个变量，在模板中好多地方都用到了，要改成流（ product: Observable<Product>;）的话，
         模板里用到product的地方都要手动添加 async管道,改起来比较麻烦，所以这里进行了手动订阅。
         同样，虽然comments在模板中使用较少，但是在控制器中将它当成了数组并使用了数组的一些方法，所以，也要手动订阅。
         当流里边发射一个新数据的时候的处理方法，getProduct返回的流里边是product，所以，流里边发射的数据就是product数据
         [2019-9-19 21:54:52]
       */
      product => {
        this.product = product;
        this.currentBid = product.price;
      }
    );
    this.productService.getCommentsForProductId(productId).subscribe(
      comments => this.comments = comments
    );
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
  watchProduct() {
    this.isWatched = !this.isWatched;
    this.wsService.createObservableSocket('ws://localhost:8085', this.product.id)
      .subscribe();
  }
}
