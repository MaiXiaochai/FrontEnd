import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChildComponent} from './child/child.component';
import {DestroyComponent} from './destroy/destroy.component';


const routes: Routes = [
  {path: '', component: ChildComponent},
  {path: 'destroy', component: DestroyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
