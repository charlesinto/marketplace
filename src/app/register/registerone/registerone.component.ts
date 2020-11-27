import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { UtilService } from '../../services/util.service';
import { User } from '../../shared/User';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registerone',
  templateUrl: './registerone.component.html',
  styleUrls: ['./registerone.component.scss'],
})
export class RegisteroneComponent implements OnInit {
  isDirty: boolean = true;
  stepOneForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
  });
  constructor(private util: UtilService, private router: Router) {}

  ngOnInit(): void {}

  continueSubmission(form: FormGroup) {
    if (!form.valid) return alert('Please fill all required fields');
    this.util.setLocalStorage('stage-two', 'stage');

    const user: User = {
      firstName: form.value['firstName'],
      lastName: form.value['lastName'],
      email: form.value['email'],
      phoneNumber: form.value['phoneNumber'],
    };

    this.util.setLocalStorage(JSON.stringify(user), 'user');
    this.router.navigate(['/register/step-2']);
  }
}
