import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


// Product 包含了产品所包含的信息
export class Product {
  constructor(
    public id: number,
    public title: string,
    public price: number,
    public rating: number,
    public desc: string,
    public categories: Array<string>
  ) {}
}

// 商品评论类
export class Comment {
  constructor(
    public id: number,
    public productId: number,
    public timestamp: string,
    public user: string,
    public rating: number,
    public content: string
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  // 获取所有商品分类信息
  getAllCategories(): string[] {
    return ['电子产品', '硬件', '图书'];
  }

  // 返回所有商品信息
  getProducts(): Observable<Product[]> {
    // @ts-ignore
    return this.http.get('/api/products');
  }

  // 返回指定 id的商品信息
  getProduct(id: number): Observable<Product> {
    // @ts-ignore
    return this.http.get('/api/product/' + id);
  }

  // 返回指定 id的商品的所有评论信息
  getCommentsForProductId(id: number): Observable<Comment[]> {
    // @ts-ignore
    return this.http.get('/api/product/' + id + '/comments');
  }
}
