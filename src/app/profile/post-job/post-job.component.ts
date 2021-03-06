import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/shared/Category';
import { JQ_TOKEN } from '../../services/jquery.service';
import { FormGroup, FormControl } from '@angular/forms';
// import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Job } from '../../shared/Job';
import { UtilService } from 'src/app/services/util.service';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { LatLng } from 'ngx-google-places-autocomplete/objects/latLng';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.scss'],
})
export class PostJobComponent implements OnInit, AfterViewInit {
  categories: Category[] = [];

  jobForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    serviceLevel: new FormControl(''),
    type: new FormControl(''),
    duration: new FormControl(''),
    featured: new FormControl(''),
    details: new FormControl(''),
    status: new FormControl(''),
    categoryId: new FormControl(''),
    country: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    latitude: new FormControl(''),
    longitude: new FormControl(''),
  });
  lat = 51.678418;
  lng = 7.809007;

  map: google.maps.Map;

  @ViewChild('map', { static: false }) mapElement: ElementRef;
  @ViewChild('placesRef') placesRef: GooglePlaceDirective;
  showAttachment: boolean = false;
  skills: { name: string; value: string }[] = [
    { name: 'PHP', value: 'PHP' },
    { name: 'Website Design', value: 'Website Design' },
    { name: 'HTML 5', value: 'HTML 5' },
    { name: 'Graphic Design', value: 'Graphic Design' },
    { name: 'SEO', value: 'SEO' },
    { name: 'Bootstrap', value: 'Bootstrap' },
  ];
  selectedSkill: string = '';
  userSkills: string[] = [];
  formattedaddress = ' ';
  options = {
    componentRestrictions: {
      country: ['NG'],
    },
  };
  constructor(
    private route: ActivatedRoute,
    @Inject(JQ_TOKEN) private $: any,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.categories = this.route.snapshot.data['categories'];
    this.utilService.isLoading();
    this.utilService.getCategories().subscribe(
      (data) => {
        this.utilService.stopLoading();
        this.categories = data;
      },
      (error) => {
        this.utilService.stopLoading();
        console.log(error);
      }
    );

    // console.log(this.$);
    // this.$('.chosen-select.Skills').select2();
  }
  ngAfterViewInit() {
    this.initializeMap();
  }
  getCoordinates() {
    if (navigator.geolocation) {
      this.utilService.isLoading();
      navigator.geolocation.getCurrentPosition((position: Position) => {
        this.utilService.stopLoading();
        this.jobForm.patchValue({
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
  onAddSkillSelect() {
    if (!this.userSkills.includes(this.selectedSkill)) {
      this.userSkills.push(this.selectedSkill);
    }
    // const selectedValue = this.jobForm.value[]
  }
  removeSkill(value: string) {
    const index = this.userSkills.findIndex((item) => item === value);
    this.userSkills.splice(index, 1);
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
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
    console.log(this.mapElement);
    console.log(mapOptions);
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }
  toggleEditable(event) {
    this.showAttachment = event.target.checked ? true : false;
  }
  public AddressChange(address: Address) {
    console.log(address);
    this.utilService.isLoading();
    this.utilService.geocodeAddress(address).subscribe(
      (data) => {
        this.utilService.stopLoading();
        this.jobForm.patchValue({
          latitude: data.geometry.location.lat,
          longitude: data.geometry.location.lng,
          city: address.vicinity,
          address: address.formatted_address,
        });
        const latlng: LatLng = data.geometry.location;
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
      },
      (error) => {
        this.utilService.stopLoading();
        console.log(error);
      }
    );
  }
  postJob() {
    try {
      if (this.jobForm.value['categoryId'] === '') return;
      const params: Job = this.jobForm.value;
      params.skills = this.userSkills;
      params.showAttachment = this.showAttachment ? 1 : 0;
      this.utilService.isLoading();

      this.utilService.createJob(params).subscribe(
        (data) => {
          this.utilService.stopLoading();
          alert('success');
          this.jobForm.reset();
        },
        (error) => {
          this.utilService.stopLoading();
          console.log(error);
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
}
