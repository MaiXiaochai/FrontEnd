import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Product1Component } from './product1/product1.component';
import {ProductService} from './shared/product.service';
import { Product2Component } from './product2/product2.component';
import {LoggerService} from './shared/logger.service';
import {AnotherProductService} from './shared/another-product.service';

@NgModule({
  declarations: [
    AppComponent,
    Product1Component,
    Product2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    // 第一个提供器
    {provide: ProductService, useFactory: (logger: LoggerService, appConfig) => {
      const dev = Math.random() > 0.5;
      if (appConfig.isDev) {
        return new ProductService(logger);
      } else {
        return new AnotherProductService(logger);
      }
      },
      deps: [LoggerService, 'APP_CONFIG']
    },
    // 第二个提供器
    LoggerService,

    // 第三个提供器
    {provide: 'APP_CONFIG', useValue: {isDev: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
