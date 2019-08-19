import {CanDeactivate} from '@angular/router';
import {ProductComponent} from '../product/product.component';

// ProductComponent 指定要保护的组件的类型
export class UnsavedGuard implements CanDeactivate<ProductComponent> {
  canDeactivate(component: ProductComponent) {
    return window.confirm('你还没有保存，确定要离开吗?');
  }
}
