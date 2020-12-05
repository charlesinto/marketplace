import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilService } from '../../services/util.service';
import { User } from 'src/app/shared/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register3',
  templateUrl: './register3.component.html',
  styleUrls: ['./register3.component.scss'],
})
export class Register3Component implements OnInit {
  stageThreeForm: FormGroup = new FormGroup({
    otp: new FormControl('', Validators.required),
  });
  constructor(private util: UtilService, private router: Router) {}

  ngOnInit(): void {}

  verify(form: FormGroup) {
    try {
      if (form.valid) {
        const user: User = JSON.parse(this.util.getFromLocalStorage('user'));
        this.util.isLoading();
        this.util
          .verifyOtp({ email: user.email, otp: form.value['otp'] })
          .subscribe(
            (data) => {
              this.util.stopLoading();
              console.log(data);
              user.verifed_at = data.user.verifed_at;

              const token = data.token;
              localStorage.removeItem('stage');
              this.util.setLocalStorage(JSON.stringify(user), 'user');
              this.util.setLocalStorage(token, 'token');
              this.util.updateCurrentUser();
              this.router.navigate(['/register/step-4']);
            },
            (error) => {
              this.util.stopLoading();
              console.error(error);
            }
          );
      }
    } catch (error) {
      console.log('error: ', error);
      alert('some error were encountered');
    }
  }
}
