import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { JQ_TOKEN } from '../../services/jquery.service';
import {
  UserCompleteDetails,
  UserSkills,
  UserEducation,
  UserExperience,
  UserProject,
  UserAward,
  UserPersonalDetails,
} from 'src/app/shared/User';
import { UtilService } from 'src/app/services/util.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, of, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { JobSkills } from 'src/app/shared/Job';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  apiLoaded: Observable<boolean>;
  userData: UserCompleteDetails;
  lat = 51.678418;
  lng = 7.809007;

  map: google.maps.Map;

  @ViewChild('map', { static: false }) mapElement: ElementRef;
  @ViewChild('placesRef') placesRef: GooglePlaceDirective;

  profileInfo = new FormGroup({
    gender: new FormControl('', []),
    hourly_rate: new FormControl('', []),
    first_name: new FormControl('', []),
    last_name: new FormControl('', []),
    email: new FormControl('', []),
    tag_line: new FormControl('', []),
    description: new FormControl('', []),
    country: new FormControl('', []),
    address: new FormControl('', []),
    latitude: new FormControl('', []),
    longitude: new FormControl('', []),
  });
  educationForm = new FormGroup({
    institution: new FormControl('', []),
    starting_date: new FormControl('', []),
    title: new FormControl('', []),
    description: new FormControl('', []),
    ending_date: new FormControl('', []),
  });

  exprienceForm = new FormGroup({
    company_title: new FormControl('', []),
    starting_date: new FormControl('', []),
    job_title: new FormControl('', []),
    job_description: new FormControl('', []),
    ending_date: new FormControl('', []),
  });

  projectForm = new FormGroup({
    project_title: new FormControl('', []),
    project_url: new FormControl('', []),
  });

  awardForm = new FormGroup({
    award_title: new FormControl('', []),
    award_date: new FormControl('', []),
  });

  newlyAddedSkills: UserSkills[] = [];
  newlyAddedProjects: UserProject[] = [];
  newAddedAwards: UserAward[] = [];
  newlyAddedEducation: UserEducation[] = [];
  newlyAddedExperience: UserExperience[] = [];
  savedSkills: UserSkills[] = [];
  removedSkills: UserSkills[] = [];

  savedEducation: UserEducation[] = [];
  savedExperience: UserExperience[] = [];
  savedProjects: UserProject[] = [];
  savedAwards: UserAward[] = [];
  skill: string;
  rating: number;
  constructor(
    @Inject(JQ_TOKEN) private $: any,
    private utilService: UtilService
  ) {}
  ngOnInit(): void {
    this.getProfile();
  }

  ngAfterViewInit() {
    this.initializeMap();
  }

  initializeMap() {
    const latlng = new google.maps.LatLng(this.lat, this.lng);

    const mapOptions: google.maps.MapOptions = {
      center: latlng,
      zoom: 16,
      fullscreenControl: false,
      mapTypeControl: false,
      streetViewControl: false,
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  async getProfile() {
    try {
      this.utilService.isLoading();
      this.userData = await this.getUserProfile();
      this.profileInfo.patchValue({
        first_name: this.userData.personalDetail.first_name,
        last_name: this.userData.personalDetail.last_name,
        gender: this.userData.personalDetail.gender,
        email: this.userData.personalDetail.email,
        tag_line: this.userData.personalDetail.tag_line,
        description: this.userData.personalDetail.description,
        latitude: this.userData.personalDetail.latitude,
        longitude: this.userData.personalDetail.longitude,
        address: this.userData.personalDetail.longitude,
        country: this.userData.personalDetail.country,
        hourly_rate: this.userData.personalDetail.hourly_rate,
      });

      this.savedSkills = this.userData.userSkills;
      this.savedAwards = this.userData.userAward;
      this.savedEducation = this.userData.userEducation;
      this.savedExperience = this.userData.userExperience;
      this.savedProjects = this.userData.userProject;

      this.utilService.stopLoading();
    } catch (error) {
      this.utilService.stopLoading();
      console.error(error);
    }
  }
  getUserProfile(): Promise<UserCompleteDetails> {
    return new Promise((resolve, reject) => {
      this.utilService.getUserProfile().subscribe(
        (data) => resolve(data),
        (error) => reject(error)
      );
    });
  }
  getCoordinates() {
    if (navigator.geolocation) {
      this.utilService.isLoading();
      navigator.geolocation.getCurrentPosition((position: Position) => {
        this.utilService.stopLoading();
        this.profileInfo.patchValue({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        const latlng = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        const mapOptions: google.maps.MapOptions = {
          center: latlng,
          zoom: 16,
          fullscreenControl: false,
          mapTypeControl: false,
          streetViewControl: false,
        };
        this.map = new google.maps.Map(
          this.mapElement.nativeElement,
          mapOptions
        );
      });
    }
  }
  public handleAddressChange(address: Address) {
    console.log(address);
    // Do some stuff
  }
  addSkill() {
    console.log(this.skill);
    if (this.skill && this.skill.trim() === '') return;

    const newUserSkill: UserSkills = {
      skillname: this.skill,
      rating: this.rating,
      owner: null,
    };
    const index = this.savedSkills.findIndex(
      (item) => item.skillname === newUserSkill.skillname
    );
    if (index === -1) {
      this.savedSkills.push(newUserSkill);
      this.newlyAddedSkills.push(newUserSkill);
    }
  }
  deleteSkill(skill: UserSkills) {
    const index = this.savedSkills.findIndex(
      (item) => item.skillname === skill.skillname
    );
    this.savedSkills.splice(index, 1);
    const indexInAddedSkills = this.newlyAddedSkills.findIndex(
      (item) => item.skillname === skill.skillname
    );
    this.newlyAddedSkills.splice(indexInAddedSkills, 1);
    this.removedSkills.push(skill);
  }
  updateRecord() {
    const personalInfo: UserPersonalDetails = { ...this.profileInfo.value };
    const updatePersonalInfo = this.utilService.updatedPersonalInfo(
      personalInfo
    );
    const updateUserSkills = this.utilService.updateUserSkills(
      this.newlyAddedSkills
    );
    const upateUserExperience = this.utilService.updateUserExperience(
      this.newlyAddedExperience
    );
    const updateUserEducation = this.utilService.updateUserEducation(
      this.newlyAddedEducation
    );
    this.utilService.isLoading();
    forkJoin([
      updatePersonalInfo,
      updateUserSkills,
      upateUserExperience,
      updateUserEducation,
    ]).subscribe((result) => {
      this.utilService.stopLoading();
      this.newAddedAwards = [];
      this.newlyAddedEducation = [];
      this.newlyAddedExperience = [];
      this.newlyAddedProjects = [];
      this.newlyAddedSkills = [];
    });
  }
  addEducation() {
    const newEducation: UserEducation = {
      ...this.educationForm.value,
      id: Math.random(),
    };
    this.savedEducation.push(newEducation);
    this.newlyAddedEducation.push(newEducation);
    this.educationForm.reset();
  }
  addExperience() {
    const newExprience: UserExperience = {
      ...this.exprienceForm.value,
    };
    this.savedExperience.push(newExprience);
    this.newlyAddedExperience.push(newExprience);
    this.exprienceForm.reset();
  }
}
