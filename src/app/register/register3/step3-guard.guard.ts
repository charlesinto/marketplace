import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Register3Component } from './register3.component';
import { UtilService } from '../../services/util.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Step3GuardGuard implements CanActivate, CanDeactivate<unknown> {
  constructor(private util: UtilService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      !(
        this.util.getFromLocalStorage('stage') &&
        this.util.getFromLocalStorage('stage') === 'stage-three'
      )
    ) {
      this.router.navigate(['/register/step-2']);
      return false;
    } else {
      return true;
    }
  }
  canDeactivate(
    component: Register3Component,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
}
