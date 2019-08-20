import {Product} from '../product/product.component';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class ProductResolve implements Resolve<Product> {
  constructor(private router: Router) {}
  // ActivatedRouteSnapshot 参数传递中的 this.routeInfo.snapshot
  resolve(route: ActivatedRouteSnapshot,  state: RouterStateSnapshot): Observable<Product> | Promise<Product> | Product {
    const productId: number = route.params.id;
    // 这里的 "==" 是教程中写的，而语法要我改成"==="结果导致 resolve不起作用，
    // ProductId 是 string类型，"==" 只比较值，在这里使用时正确的 2019-8-20
    if (productId == 1) {
      return new Product(1, 'iPhone7');
    } else {
      this.router.navigate(['/home']);
      return null;
    }
  }
}
