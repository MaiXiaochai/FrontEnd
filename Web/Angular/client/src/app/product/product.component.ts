import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Observable<any>;

  constructor(private http: HttpClient) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Basic 123456'
      })
    };
    this.products = this.http.get('/api/products', httpOptions);
  }

  ngOnInit() {}
}
