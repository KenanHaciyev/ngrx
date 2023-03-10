import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {getErrorMessage, getLoading} from "./store/shared/shared.selector";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ngrx';
  showLoading: Observable<boolean>
  errorMessage: Observable<string>

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.showLoading = this.store.select(getLoading)
    this.errorMessage = this.store.select(getErrorMessage)
  }

}
