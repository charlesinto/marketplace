import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Injectable({
  providedIn: 'root',
})
export class DashboardProfileGuard
  implements CanActivate, CanDeactivate<unknown> {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
  canDeactivate(
    component: DashboardComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const {
      newAddedAwards,
      newlyAddedEducation,
      newlyAddedExperience,
      newlyAddedProjects,
      newlyAddedSkills,
    } = component;
    if (
      newlyAddedEducation.length > 0 ||
      newAddedAwards.length > 0 ||
      newlyAddedExperience.length > 0 ||
      newlyAddedProjects.length > 0 ||
      newlyAddedSkills.length > 0
    ) {
      const discardChanges: boolean = confirm(
        'You have some unsaved changes, do you want to discard the changes?'
      );
      if (discardChanges) return true;

      return false;
    }
    return true;
  }
}
