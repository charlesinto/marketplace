import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostJobComponent } from './post-job/post-job.component';
import { CategoryComponent } from './category/category.component';
import { CategoryListResolver } from '../resolvers/category-list.resolver';
import { UserProposalsComponent } from './user-proposals/user-proposals.component';
import { DashboardProfileGuard } from './guards/dashboard-profile.guard';
import { ServicesComponent } from './services/services.component';
const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        pathMatch: 'full',
        canDeactivate: [DashboardProfileGuard],
      },
      {
        path: 'post-job',
        component: PostJobComponent,
        pathMatch: 'full',
        // resolve: { categories: CategoryListResolver },
      },
      {
        path: 'services',
        component: ServicesComponent,
        pathMatch: 'full',
      },
      {
        path: 'proposals',
        component: UserProposalsComponent,
        pathMatch: 'full',
      },
      {
        path: 'job/category',
        component: CategoryComponent,
        pathMatch: 'full',
        resolve: { categories: CategoryListResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
