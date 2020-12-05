import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { JobDetail } from 'src/app/shared/Job';
import { UtilService } from 'src/app/services/util.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Proposal } from 'src/app/shared/Proposal';
import { ThrowStmt } from '@angular/compiler';
// import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-job-proposal',
  templateUrl: './job-proposal.component.html',
  styleUrls: ['./job-proposal.component.scss'],
})
export class JobProposalComponent implements OnInit {
  constructor(private route: ActivatedRoute, private util: UtilService) {}
  job: JobDetail;

  proposedamount: string = '';
  description: string = '';
  timetodeliver: string = '';
  jobId: string;
  ngOnInit(): void {
    console.log(this.route.snapshot.data);
    this.job = this.route.snapshot.data['job'];
  }
  submitProposal() {
    console.log(this.proposedamount, this.description, this.timetodeliver);

    if (
      `${this.proposedamount}`.trim() === '' ||
      this.description.trim() === '' ||
      this.timetodeliver.trim() === ''
    ) {
      alert();
      return;
    }

    this.util.isLoading();
    const params: Proposal = {
      description: this.description,
      timetodeliver: this.timetodeliver,
      proposedamount: this.proposedamount,
      jobid: this.job.id,
    };
    this.util.submitProposal(params).subscribe(
      (data) => {
        this.util.stopLoading();
        alert('success');
        console.log(data);
      },
      (error) => {
        alert('failed');
        this.util.stopLoading();
        console.log(error);
      }
    );
  }
}
