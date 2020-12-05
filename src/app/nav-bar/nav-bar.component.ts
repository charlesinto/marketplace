import { Component, OnInit } from '@angular/core';
import { UtilService } from '../services/util.service';
import { User } from '../shared/User';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  user: User = null;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(private util: UtilService) {}

  ngOnInit(): void {
    this.util.getUser().subscribe((data) => {
      console.log('user: ', data);
      this.user = data;
    });
  }

  login(form: FormGroup) {
    // console.log('called');
    if (form.invalid) return alert('please provide email and passsword');
    // this.util.isAuthenticated(true);
    this.util.isLoading();
    this.util
      .login({ email: form.value['email'], password: form.value['password'] })
      .subscribe(
        (data) => {
          const user: User = {
            firstName: data.user['firstname'],
            lastName: data.user['lastname'],
            phoneNumber: data.user['phonenumber'],
            email: data.user['email'],
            companyDepartment: data.user['companydepartment'],
            companyEmployeeRange: data.user['companyemployeerange'],
            active: data.user['active'],
            type: data.user['type'],
            updated_at: data.user['updated_at'],
            verifed_at: data.user['verified_At'],
          };
          this.util.setLocalStorage(JSON.stringify(user), 'user');
          this.util.setLocalStorage(data.token, 'token');
          this.util.updateCurrentUser();
          this.util.stopLoading();
        },
        (error) => {
          this.util.stopLoading();
          console.error(error);
        }
      );
  }
  logout() {
    // this.util.isAuthenticated(false);
    this.util.logout();
  }
}
