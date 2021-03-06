import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../shared/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  formModel: FormGroup;

  categories: string[];
  constructor(private productService: ProductService) {
    const fb = new FormBuilder();
    this.formModel = fb.group({
      title: ['', Validators.minLength(3)],
      price: [null, this.positiveNumberValidator],
      category: ['-1']
    });
  }

  ngOnInit() {
    this.categories = this.productService.getAllCategories();
  }

  // 一个正数的自定义校验器
  positiveNumberValidator(control: FormControl): any {
    if (!control.value) {
      return null;
    }

    const price = parseInt(control.value, 0);
    if (price > 0) {
      return null;
    } else {
      return {positiveNumber: true};
    }
  }

  onSearch() {
    if (this.formModel.valid) {
      // 发射的东西应该是符合 ProductSearchParams类声明的一个对象
      this.productService.searchEvent.emit(this.formModel.value);
    }
  }
}
