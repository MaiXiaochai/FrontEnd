import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  // 参数依次表示，商品列表，过滤的字段，输入的关键字
  transform(list: any[], filterField: string, keyword: string): any {
    if (!filterField || !keyword) {
      return list;
    }
    return list.filter(item => {
      const  fieldValue = item[filterField];
      // indexOf找到则大于零
      return fieldValue.indexOf(keyword) >= 0;
    });
  }
}
