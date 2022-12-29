import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AuthService} from "../../services/auth.service";
import {loginStart, loginSuccess} from "./auth.actions";
import {catchError, exhaustMap, map, tap} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {setErrorMessage, setLoadingSpinner} from "../../store/shared/shared.actions";
import {of} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class AuthEffects {

  login$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action: any) => {
        return this.authService.login(action.email, action.password)
          .pipe(
            map(data => {
              this.store.dispatch(setLoadingSpinner({status: false}))
              this.store.dispatch(setErrorMessage({message: ''}))
              const user = this.authService.formatUser(data)
              return loginSuccess({user})
            }),
            catchError((err: any): any => {
              this.store.dispatch(setLoadingSpinner({status: false}))
              const errorMessage = this.authService.getErrorMessage(err.error.error.message)
              return of(setErrorMessage({message: errorMessage}))
            })
          )
      })
    )
  })

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginSuccess),
        tap((action) => {
          this.router.navigate(['/'])
        })
      )
    }, {dispatch: false}
  )

  constructor(private actions$: Actions, private authService: AuthService, private store: Store, private router: Router) {
  }


}
