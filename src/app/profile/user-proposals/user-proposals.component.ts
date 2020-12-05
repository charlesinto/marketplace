import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { JobDetail } from 'src/app/shared/Job';
import { Proposal } from 'src/app/shared/Proposal';

@Component({
  selector: 'app-user-proposals',
  templateUrl: './user-proposals.component.html',
  styleUrls: ['./user-proposals.component.scss'],
})
export class UserProposalsComponent implements OnInit {
  constructor(private utilService: UtilService) {}
  jobList: JobDetail[];
  ngOnInit(): void {
    this.getJobsandProposals();
  }
  async getJobsandProposals() {
    try {
      this.utilService.isLoading();
      this.jobList = await this.getProposals();
      this.jobList.forEach((item) => {
        item.proposals.sort(
          (item1, item2) =>
            new Date(item1.date_created).getTime() -
            new Date(item2.date_created).getTime()
        );
      });
      console.log(this.jobList);
      this.utilService.stopLoading();
    } catch (error) {
      this.utilService.stopLoading();
      console.log(error);
    }
  }
  getProposals(): Promise<JobDetail[]> {
    return new Promise((resolve, reject) => {
      this.utilService.getUserJobandProposals().subscribe(
        (response: JobDetail[]) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  acceptProposal(job: JobDetail, proposal: Proposal) {
    console.log(job, proposal);
    const confrm = confirm('Hire proposal!');
    if (!confrm) return;
    this.utilService.isLoading();
    this.utilService.acceptProposal(job, proposal).subscribe(
      (data) => {
        this.utilService.stopLoading();
        this.getJobsandProposals();
      },
      (error) => {
        this.utilService.stopLoading();
        console.log(error);
      }
    );
  }
}
