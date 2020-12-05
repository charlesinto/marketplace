import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilService } from '../../services/util.service';
import { User } from '../../shared/User';
import { Router } from '@angular/router';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
@Component({
  selector: 'app-registertwo',
  templateUrl: './registertwo.component.html',
  styleUrls: ['./registertwo.component.scss'],
})
export class RegistertwoComponent implements OnInit {
  stageTwoForm: FormGroup = new FormGroup({
    country: new FormControl('', Validators.required),
    companyEmployeeRange: new FormControl(''),
    companyDepartment: new FormControl(''),
    type: new FormControl(''),
    password: new FormControl('', Validators.required),
    retypePassword: new FormControl('', Validators.required),
  });
  constructor(private util: UtilService, private router: Router) {}

  ngOnInit(): void {}
  async continue(form: FormGroup) {
    console.log(form.value);

    if (form.invalid) return alert('fill all fields');

    if (form.value['password'] !== form.value['retypePassword'])
      return alert('Passwords do not match');
    const user: User = JSON.parse(this.util.getFromLocalStorage('user'));

    user.type = form.value['type'];
    user.password = form.value['password'];

    this.util.setLocalStorage('stage-three', 'stage');
    this.util.setLocalStorage(JSON.stringify(user), 'user');
    try {
      // console.log(user);
      this.util.isLoading();
      this.util.registerAccount(user).subscribe(
        (data) => {
          console.log(data);
          this.util.stopLoading();
          this.router.navigate(['/register/step-3']);
        },
        (err) => {
          this.util.stopLoading();
          console.error(err);
        }
      );
    } catch (error) {
      console.log(error);
      alert('some errors were encountered');
    }
    // this.router.navigate(['/register/step-3']);
  }
}
