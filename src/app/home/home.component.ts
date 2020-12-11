import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { LatLng } from 'ngx-google-places-autocomplete/objects/latLng';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilService } from '../services/util.service';
import { JQ_TOKEN } from '../services/jquery.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  options = {
    componentRestrictions: {
      country: ['NG'],
    },
  };

  jobForm: FormGroup = new FormGroup({
    latitude: new FormControl('', []),
    longitude: new FormControl('', []),
    city: new FormControl('', [Validators.required]),
    address: new FormControl('', []),
  });

  constructor(
    private utilService: UtilService,
    @Inject(JQ_TOKEN) private $: any,
    private router: Router
  ) {}

  ngOnInit(): void {}

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
      },
      (error) => {
        this.utilService.stopLoading();
        console.log(error);
      }
    );
  }
  handleSearch() {
    const serviceType: string = this.$('#selected-service').text();
    if (!(serviceType && serviceType.trim() !== '') || !this.jobForm.valid)
      return;
    this.router.navigateByUrl(
      `/job?type=${serviceType.trim()}&location=${
        this.jobForm.value['city']
      }&lat=${this.jobForm.value['latitude']}&lng=${
        this.jobForm.value['longitude']
      }`
    );

    // this.router.navigate([
    //   '/job',
    //   {
    //     queryParams: {
    //       type: serviceType,
    //       location: this.jobForm.value['city'],
    //       lat: this.jobForm.value['latitude'],
    //       lng: this.jobForm.value['longitude'],
    //     },
    //   },
    // ]);
  }
}
