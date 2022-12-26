import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../state/app.state";
import {Observable} from "rxjs";
import {Post} from "../../models/posts.model";
import {getPosts} from "../state/posts.selector";
import {deletePost} from "../state/posts.actions";

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  posts: Observable<Post[]>

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.posts = this.store.select(getPosts)
  }

  onDeletePost(id: any) {
    if (confirm('Are you sure you want delete this?')) {
      return this.store.dispatch(deletePost({id}))
    }
  }
}
