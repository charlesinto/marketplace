import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { JobDetail } from 'src/app/shared/Job';
import { ThrowStmt } from '@angular/compiler';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
})
export class JobListComponent implements OnInit {
  jobList: JobDetail[] = [];
  catgeoyName: string = '';
  jobDb: JobDetail[] = [];
  serviceType: string;
  location: string;
  lat: string;
  lng: string;
  constructor(
    private utilService: UtilService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.queryParams.subscribe((data) => {
      this.serviceType = data['type'];
      this.location = data['location'];
      this.lat = data['lat'];
      this.lng = data['lng'];
      this.getJobs(this.serviceType, this.location, this.lat, this.lng);
    });
  }

  async getJobs(serviceType = 'all', location = 'all', lat = null, lng = null) {
    try {
      this.utilService.isLoading();
      this.jobList = await this.getJobListing(serviceType, location, lat, lng);
      this.jobDb = this.jobList;
      console.log(this.jobList);
      this.utilService.stopLoading();
    } catch (error) {
      this.utilService.stopLoading();
      console.log(error);
    }
  }

  filterByCategory() {
    console.log('called');
    const jobs = this.jobDb.filter((item) =>
      item.categoryname.includes(this.catgeoyName)
    );
    console.log(jobs);
    this.jobList = jobs;
  }

  getJobListing(
    serviceType = 'all',
    location = 'all',
    lat = null,
    lng = null
  ): Promise<JobDetail[]> {
    return new Promise((resolve, reject) => {
      this.utilService.getJobListing(serviceType, location, lat, lng).subscribe(
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
