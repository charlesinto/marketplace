import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobRoutingModule } from './job-routing.module';
import { JobComponent } from './job.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobProposalComponent } from './job-proposal/job-proposal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [JobComponent, JobListComponent, JobProposalComponent],
  imports: [CommonModule, JobRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
})
export class JobModule {}
