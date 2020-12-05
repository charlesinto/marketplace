import { Component, OnInit, Inject } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { JQ_TOKEN } from '../../services/jquery.service';
import { User } from 'src/app/shared/User';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  user: User;
  constructor(private util: UtilService, @Inject(JQ_TOKEN) private $: any) {}

  ngOnInit(): void {
    this.registerEvents();
    this.util.getUser().subscribe((data) => (this.user = data));
  }

  logout() {
    this.util.logout();
  }
  registerEvents() {
    console.log(this.$);
    const $this = this;
    const menu_icon = document.querySelector('.menu-icon');
    function addClassFunThree() {
      if (!$this.$(this).hasClass('click-menu-icon')) {
        $this
          .$(
            '.wt-usersidebar .wt-companysinfo .wt-title, .wt-usersidebar .wt-companysinfo .wt-btnarea'
          )
          .css('display', 'block');
        $this
          .$(
            '.wt-usersidebar .wt-companysinfo .wt-title, .wt-usersidebar .wt-companysinfo .wt-btnarea'
          )
          .css('margin-left', '0');
        // alert();
        $this.$('.wt-sidebarwrapper').css('width', '270px');
      } else {
        $this.$('.wt-sidebarwrapper').css('width', '50px');
        $this
          .$(
            '.wt-usersidebar .wt-companysinfo .wt-title, .wt-usersidebar .wt-companysinfo .wt-btnarea'
          )
          .css('display', 'none');
      }
      this.classList.toggle('click-menu-icon');
    }
    menu_icon.addEventListener('click', addClassFunThree);
  }
}
