import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChildComponent } from './child/child.component';
import {FormsModule} from '@angular/forms';
import { Child2Component } from './child2/child2.component';
import { ProjectionComponent } from './projection/projection.component';
import { DestroyComponent } from './destroy/destroy.component';

@NgModule({
  declarations: [
    AppComponent,
    ChildComponent,
    Child2Component,
    ProjectionComponent,
    DestroyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
