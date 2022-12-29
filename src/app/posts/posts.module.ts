import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {PostsListComponent} from "./posts-list/posts-list.component";
import {AddPostComponent} from "./add-post/add-post.component";
import {EditPostComponent} from "./edit-post/edit-post.component";
import {ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import {postsReducer} from "./state/posts.reducer";

const routes: Routes = [
  {
    path: '', component: PostsListComponent, children: [
      {path: 'add', component: AddPostComponent},
      {path: 'edit/:id', component: EditPostComponent}
    ]
  }
]

@NgModule({
  declarations: [
    PostsListComponent,
    AddPostComponent,
    EditPostComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('posts', postsReducer)
  ]
})
export class PostsModule {
}
