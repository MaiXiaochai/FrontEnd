import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  private products: Array<Product>;
  constructor() { }

  // ngOnInit 组件声明周期钩子中的一个钩子，会在组件实例化的时候被调用一次
  ngOnInit() {
    this.products = [
      new Product(1, "慕手机Max", 1699, 4.5, "4100Ah快充/3G运存/6寸大屏", ["电子产品", "硬件"]),
      new Product(2, "超级电视 S8", 2999, 4.0, "安卓智能/超高清", ["家电"]),
      new Product(3, "MoocBook Pro", 3999, 5, "新品抢先/精品外观/颜值逆天", ["PC"]),
      new Product(4, '扫地机器人', 1699, 4.0, "自动充电/完全自主/清扫面积大", ["清洁工具"]),
      new Product(5, '云台', 1599, 4.5, '超长续航/充电五分钟/拍摄一小时', ["辅助耗材"]),
      new Product(6, "大疆无人机", 9999, 5.0, '30分钟续航/超清稳定/自动规避障碍', ["飞行器"])
    ];
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
  ) {
  }
}
