import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { Page404Component } from './page404/page404.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { SimpleLoaderComponent } from './simple-loader/simple-loader.component';

import { JQ_TOKEN } from './services/jquery.service';
import { UtilService } from './services/util.service';
import { JobDetailResolver } from './resolvers/job-detail.resolver';
import { UserProfileComponent } from './user-profile/user-profile.component';
// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

let jQuery = window['$'];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    Page404Component,
    FooterComponent,
    LoginComponent,
    SimpleLoaderComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GooglePlaceModule,
    // NgMultiSelectDropDownModule.forRoot(),
  ],

  providers: [
    UtilService,
    { provide: JQ_TOKEN, useValue: jQuery },
    JobDetailResolver,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
