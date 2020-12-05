import { Component, OnInit } from '@angular/core';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-simple-loader',
  templateUrl: './simple-loader.component.html',
  styleUrls: ['./simple-loader.component.scss'],
})
export class SimpleLoaderComponent implements OnInit {
  loading: boolean = true;
  constructor(private utilService: UtilService) {}

  ngOnInit(): void {
    this.utilService.getLoadingState().subscribe((state) => {
      console.log('next state: ', state);
      this.loading = state;
    });
  }
}
