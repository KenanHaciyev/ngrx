import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "../home/home.component";
import {CounterComponent} from "./counter/counter.component";
import {PostsListComponent} from "../posts/posts-list/posts-list.component";

const appRoutes:Routes = [
  {path:'', component:HomeComponent},
  {path: 'counter', component: CounterComponent},
  {path: 'posts', component: PostsListComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
  ]
})
export class AppRoutingModule { }
