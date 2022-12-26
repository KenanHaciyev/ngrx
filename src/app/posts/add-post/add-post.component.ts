import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {getPosts} from "../state/posts.selector";
import {addPost} from "../state/posts.actions";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  postForm:FormGroup
  constructor(private store:Store) { }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(null,[Validators.required, Validators.minLength(6)]),
      description: new FormControl(null,[Validators.required,Validators.minLength(10)])
    })
  }

  onAddPost() {
    if(this.postForm.invalid) {
      return
    }

    const post = {
      title:this.postForm.value.title,
      description: this.postForm.value.description
    }

    this.store.dispatch(addPost({post}))
  }

  showDescriptionErrors():any {
    const descriptionForm = this.postForm.get('description')
    if(descriptionForm?.touched && !descriptionForm.valid){
      if (descriptionForm.errors?.['required']) {
        return 'Enter a description'
      }
      if(descriptionForm.errors?.['minlength']){
        return 'Description should be minimum 10 characters'
      }
    }
  }
}
