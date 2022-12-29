import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {Post} from "../../models/posts.model";
import {getPostById} from "../state/posts.selector";
import {Subscription} from "rxjs";
import {updatePost} from "../state/posts.actions";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy {
  postForm: FormGroup;
  post: Post
  postSubscription: Subscription

  constructor(private route: ActivatedRoute,
              private store: Store<AppState>,
              private router: Router) {
  }

  ngOnInit(): void {
    this.postSubscription = this.route.params.subscribe(params => {
      const id = params['id']
      this.store.select(getPostById, {id}).subscribe(data => {
        this.post = data
        this.formCreate()
      })
    })
  }

  ngOnDestroy(): void {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe()
    }
  }

  onSubmit() {
    if (this.postForm.invalid) {
      return
    }

    const title = this.postForm.value.title
    const description = this.postForm.value.description

    const post = {
      id: this.post.id,
      title,
      description
    }

    this.store.dispatch(updatePost({post}))
    this.router.navigate(['/posts'])
  }

  private formCreate() {
    this.postForm = new FormGroup({
      title: new FormControl(this.post.title, [Validators.required, Validators.minLength(6)]),
      description: new FormControl(this.post.description, [Validators.required, Validators.minLength(10)])
    })
  }
}
