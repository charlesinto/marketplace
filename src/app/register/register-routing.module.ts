import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register.component';
import { RegistertwoComponent } from './registertwo/registertwo.component';
import { RegisteroneComponent } from './registerone/registerone.component';
import { Register3Component } from './register3/register3.component';
import { Register4Component } from './register4/register4.component';

import { Step1GuardGuard } from './registerone/step1-guard.guard';
import { Step2GuardGuard } from './registertwo/step2-guard.guard';
import { Step3GuardGuard } from './register3/step3-guard.guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,

    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'step-1',
      },
      {
        path: 'step-1',
        component: RegisteroneComponent,
        pathMatch: 'full',
        canDeactivate: [Step1GuardGuard],
      },
      {
        path: 'step-2',
        component: RegistertwoComponent,
        pathMatch: 'full',
        canActivate: [Step2GuardGuard],
        canDeactivate: [Step2GuardGuard],
      },
      {
        path: 'step-3',
        component: Register3Component,
        pathMatch: 'full',
        canActivate: [Step3GuardGuard],
        canDeactivate: [Step3GuardGuard],
      },
      {
        path: 'step-4',
        component: Register4Component,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterRoutingModule {}
