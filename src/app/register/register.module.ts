import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { RegistertwoComponent } from './registertwo/registertwo.component';
import { RegisteroneComponent } from './registerone/registerone.component';
import { Register3Component } from './register3/register3.component';
import { Register4Component } from './register4/register4.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { UtilService } from '../services/util.service';
import { ProfileComponent } from './profile/profile.component';
// import { FooterComponent } from '../footer/footer.component';

@NgModule({
  declarations: [
    RegisterComponent,
    RegistertwoComponent,
    RegisteroneComponent,
    Register3Component,
    Register4Component,
    ProfileComponent,
    // FooterComponent,
  ],

  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class RegisterModule {}
