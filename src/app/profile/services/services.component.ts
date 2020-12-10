import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
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
import { ThrowStmt } from '@angular/compiler';
import { LatLng } from 'ngx-google-places-autocomplete/objects/latLng';
import { Service } from '../../shared/Service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',

  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit, AfterViewInit {
  categories: Category[] = [];
  @Input() addressType: string;
  // autocompleteInput: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();

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
  dataModel: any;
  map: google.maps.Map;

  @ViewChild('map', { static: false }) mapElement: ElementRef;
  // @ViewChild('addressText') placesRef: ElementRef;
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
  ngAfterViewInit() {
    this.initializeMap();
    // this.getPlaceAutocomplete();
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
  postJob() {
    try {
      if (this.jobForm.value['categoryId'] === '') return;
      const params: Service = this.jobForm.value;
      params.showAttachment = this.showAttachment ? 1 : 0;
      console.log('Params: ', params);
      this.utilService.isLoading();
      this.utilService.createService(params).subscribe(
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
      // console.log(this.dataModel);
    } catch (error) {
      console.error(error);
    }
  }
}
