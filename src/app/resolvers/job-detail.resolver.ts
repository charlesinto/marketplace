import { Injectable } from '@angular/core';
import { Category } from '../shared/Category';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute,
  ActivationEnd,
} from '@angular/router';
import { UtilService } from '../services/util.service';
import { Observable } from 'rxjs';
import { JobDetail } from '../shared/Job';

@Injectable({
  providedIn: 'root',
})
export class JobDetailResolver implements Resolve<JobDetail> {
  constructor(private util: UtilService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<JobDetail> {
    console.log('paramsn: ', route.params);
    return this.util.getJobById(route.paramMap.get('id'));
  }
}
