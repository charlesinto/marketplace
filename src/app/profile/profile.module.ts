import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { PostJobComponent } from './post-job/post-job.component';
import { CategoryComponent } from './category/category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CategoryListResolver } from '../resolvers/category-list.resolver';
import { UserProposalsComponent } from './user-proposals/user-proposals.component';
// import { GoogleMapsModule } from '@angular/google-maps';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { ServicesComponent } from './services/services.component';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  declarations: [
    ProfileComponent,
    DashboardComponent,
    SidenavComponent,
    PostJobComponent,
    CategoryComponent,
    UserProposalsComponent,
    ServicesComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    EditorModule,
    // GoogleMapsModule
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyC8aIKLtCcXqEHG_Gfm35Iahplw3HoKzLM',
    // }),
    // NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [CategoryListResolver],
})
export class ProfileModule {}
