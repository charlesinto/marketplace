import { Injectable } from '@angular/core';
import { Category } from '../shared/Category';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { UtilService } from '../services/util.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryListResolver implements Resolve<Category[]> {
  constructor(private util: UtilService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Category[]> {
    return this.util.getCategories();
  }
}
