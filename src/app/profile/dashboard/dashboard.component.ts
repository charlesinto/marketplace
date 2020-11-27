import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const menu_icon = document.querySelector('.menu-icon');
    function addClassFunThree() {
      this.classList.toggle('click-menu-icon');
    }
    menu_icon.addEventListener('click', addClassFunThree);
  }
}
