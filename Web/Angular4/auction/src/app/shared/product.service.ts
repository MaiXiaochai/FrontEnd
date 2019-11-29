import {EventEmitter, Injectable} from '@angular/core';
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

export class ProductSearchParams {
  constructor(
    public title: string,
    public price: number,
    public category: string,
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }
  // EventEmitter 要写在最开始，也就是现在的这个位置
  // EventEmitter 既可以作为事件的订阅者也可以作为事件的发射者
  searchEvent: EventEmitter<ProductSearchParams> = new EventEmitter();

  // 获取所有商品分类信息
  getAllCategories(): string[] {
    return ['电子产品', '硬件', '图书'];
  }

  // 返回所有商品信息
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products');
  }

  // 返回指定 id的商品信息
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>('/api/product/' + id);
  }

  // 返回指定 id的商品的所有评论信息
  getCommentsForProductId(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>('/api/product/' + id + '/comments');

  }

  search(params: ProductSearchParams): Observable<Product[]> {
    const url = '/api/products?' + this.encodeParams(params);
    return this.http.get<Product[]>(url);
  }

  // json参数拼接成字符串
  private encodeParams(params: ProductSearchParams) {
    let result: URLSearchParams;

    result = Object.keys(params)
      .filter(key => params[key])
      .reduce((sum: URLSearchParams, key: string) => {
        sum.append(key, params[key]);
        return sum;
        // 初始值，类型要和被计算的参数的类型相同
      }, new URLSearchParams());
    return result;
  }
}
