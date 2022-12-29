import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AuthService} from "../../services/auth.service";
import {loginStart, loginSuccess} from "./auth.actions";
import {exhaustMap, map} from "rxjs/operators";

@Injectable()
export class AuthEffects {

  login$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action: any) => {
        return this.authService.login(action.email, action.password)
          .pipe(
            map(data => {
              const user = this.authService.formatUser(data)
              return loginSuccess({user})
            })
          )
      })
    )
  })

  constructor(private actions$: Actions, private authService: AuthService) {
  }


}
