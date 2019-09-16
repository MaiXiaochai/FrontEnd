import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // 商品详情信息
  private products: Product[] = [
    new Product(1, '慕手机Max', 1699, 4.5, '4100Ah快充/3G运存/6寸大屏', ['电子产品', '硬件']),
    new Product(2, '超级电视 S8', 2999, 4.0, '安卓智能/超高清', ['家电']),
    new Product(3, 'MoocBook Pro', 13999, 5, '新品抢先/精品外观/颜值逆天', ['PC']),
    new Product(4, '扫地机器人', 1699, 4.0, '自主充电/完全自主/清扫面积大', ['清洁工具']),
    new Product(5, '大疆云台', 1599, 4.5, '超长续航/充电五分钟，拍摄一小时', ['辅助耗材']),
    new Product(6, '大疆无人机', 9999, 5.0, '30分钟续航/超清稳定/自主避障', ['飞行器'])
  ];

  // 评论详情信息
  private comments: Comment[] = [
    new Comment(1, 1, '2019-8-22 16:58:19', 'LiMing', 3, 'Nice！'),
    new Comment(2, 1, '2019-8-22 16:58:19', 'Danny', 3, 'Good！'),
    new Comment(3, 1, '2019-8-22 16:58:19', 'Jenny', 3, 'Very good！'),
    new Comment(4, 2, '2019-8-22 16:58:19', 'ZhangQuandan', 3, 'stupid!'),
    new Comment(5, 5, '2019-8-22 16:58:19', 'ZhaoTiezhu', 3, '重金求子！'),
    new Comment(6, 6, '2019-8-22 16:58:19', 'LiCuihua', 3, '哎呀，妈呀！'),
  ];
  constructor() { }

  // 返回所有商品信息
  getProducts(): Product[] {
    return this.products;
  }

  // 返回指定 id的商品信息
  getProduct(id: number): Product {
    // tslint:disable-next-line:triple-equals
    return this.products.find((product) => product.id == id);
  }

  // 返回指定 id的商品的所有评论信息
  getCommentsForProductId(id: number): Comment[] {
    // tslint:disable-next-line:triple-equals
    return this.comments.filter((comment: Comment) => comment.productId == id);
  }
}

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
