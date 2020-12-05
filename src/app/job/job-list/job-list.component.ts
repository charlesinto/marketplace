import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { JobDetail } from 'src/app/shared/Job';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
})
export class JobListComponent implements OnInit {
  jobList: JobDetail[] = [];
  constructor(private utilService: UtilService) {}

  ngOnInit(): void {
    this.getJobs();
  }

  async getJobs() {
    try {
      this.utilService.isLoading();
      this.jobList = await this.getJobListing();
      console.log(this.jobList);
      this.utilService.stopLoading();
    } catch (error) {
      this.utilService.stopLoading();
      console.log(error);
    }
  }

  getJobListing(): Promise<JobDetail[]> {
    return new Promise((resolve, reject) => {
      this.utilService.getJobListing().subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
