import { Component, OnInit, Inject } from '@angular/core';
import { JQ_TOKEN } from '../../services/jquery.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(@Inject(JQ_TOKEN) private $: any) {}

  ngOnInit(): void {}
}
