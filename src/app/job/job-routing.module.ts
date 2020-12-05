import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobComponent } from './job.component';
import { JobListComponent } from './job-list/job-list.component';
import { combineAll } from 'rxjs/operators';
import { JobProposalComponent } from './job-proposal/job-proposal.component';
import { JobDetailResolver } from '../resolvers/job-detail.resolver';

const routes: Routes = [
  {
    path: '',
    component: JobComponent,
    children: [
      {
        path: '',
        redirectTo: 'job-listing',
      },
      {
        path: 'job-listing',
        component: JobListComponent,
        pathMatch: 'full',
      },
      {
        path: 'view-job/:id',
        resolve: { job: JobDetailResolver },
        component: JobProposalComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobRoutingModule {}
