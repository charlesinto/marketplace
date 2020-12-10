import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from '../services/util.service';
import { UserCompleteDetails } from '../shared/User';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userInfo: UserCompleteDetails;
  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe((data) => {
      this.utilService.isLoading();
      this.utilService.getUserInfoById(data.get('id')).subscribe(
        (data) => {
          this.utilService.stopLoading();
          this.userInfo = data;
        },
        (error) => {
          this.utilService.stopLoading();
          if (error.status === 404) return this.route.navigate(['404']);
        }
      );
    });
  }
}
