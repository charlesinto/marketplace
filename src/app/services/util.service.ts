import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import {
  User,
  UserCompleteDetails,
  UserPersonalDetails,
  UserSkills,
  UserExperience,
  UserEducation,
} from '../shared/User';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Category } from '../shared/Category';
import { Job, JobDetail } from '../shared/Job';
import { Proposal } from '../shared/Proposal';
import { Service } from '../shared/Service';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
@Injectable({
  providedIn: 'root',
})
export class UtilService {
  baseUrl = 'https://marketplacev1.herokuapp.com';
  apiKey = 'AIzaSyC8aIKLtCcXqEHG_Gfm35Iahplw3HoKzLM';
  user = new BehaviorSubject(null);
  loading = new BehaviorSubject(false);
  constructor(private http: HttpClient) {
    this.updateCurrentUser();
  }
  logout() {
    localStorage.removeItem('user');
    this.updateCurrentUser();
  }
  login(params: { email: string; password: string }): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/api/v1/auth/login`, params)
      .pipe(catchError(this.handleHttpError));
  }
  getFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    if (data) {
      return this.decryptData(data);
    }
    return null;
  }
  getUser(): BehaviorSubject<User> {
    return this.user;
  }
  updateCurrentUser() {
    const user: User = JSON.parse(this.getFromLocalStorage('user'));
    console.log(user);
    if (user) {
      this.user.next(user);
    } else {
      this.user.next(null);
    }
  }
  isLoading() {
    console.log('called loader');
    this.loading.next(true);
  }
  stopLoading() {
    this.loading.next(false);
  }
  getLoadingState(): BehaviorSubject<boolean> {
    return this.loading;
  }
  encryptData(data = '') {
    const KEY = 'DISPUTEMANAGE@BEHDUE@';
    return CryptoJS.AES.encrypt(data, KEY);
  }
  decryptData(encryptedData = '') {
    const KEY = 'DISPUTEMANAGE@BEHDUE@';
    const decrypted = CryptoJS.AES.decrypt(encryptedData, KEY);

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
  setLocalStorage(data = '', key) {
    const encryptedData = this.encryptData(data);
    localStorage.setItem(key, encryptedData);
  }

  registerAccount(user: User): Observable<any> {
    return this.http
      .post(this.baseUrl + '/api/v1/auth/signup', user)
      .pipe(catchError(this.handleHttpError));
  }
  addCategory(params: Category): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/api/v1/category/create-category`, params)
      .pipe(catchError(this.handleHttpError));
  }
  getToken(): string {
    return this.getFromLocalStorage('token');
  }
  createJob(params: Job): Observable<any> {
    let headers = new HttpHeaders({
      authorization: this.getToken(),
    });
    let options = { headers: headers };
    return this.http
      .post(`${this.baseUrl}/api/v1/job/create-job`, params, options)
      .pipe(catchError(this.handleHttpError));
  }
  createService(params: Service): Observable<any> {
    let headers = new HttpHeaders({
      authorization: this.getToken(),
    });
    let options = { headers: headers };
    return this.http
      .post(`${this.baseUrl}/api/v1/service/create-service`, params, options)
      .pipe(catchError(this.handleHttpError));
  }
  getCategories(): Observable<Category[]> {
    return this.http
      .get<Category[]>(`${this.baseUrl}/api/v1/category`)
      .pipe(
        map((response) => {
          return response['data'];
        })
      )

      .pipe(
        map((data) => {
          const categories: Category[] = [];
          data.forEach((ele) => {
            categories.push({
              name: ele['name'],
              id: ele['id'],
              description: ele['description'],
            });
          });
          return categories;
        })
      )
      .pipe(catchError(this.handleHttpError));
  }
  getJobListing(): Observable<JobDetail[]> {
    return this.http
      .get(`${this.baseUrl}/api/v1/job/job-listing`)
      .pipe(catchError(this.handleHttpError))
      .pipe(
        map((response) => {
          const jobs: JobDetail[] = [];
          response['data'].forEach((item) => {
            console.log(item);
            jobs.push({
              id: item.id,
              title: item.title,
              serviceLevel: item.serviceLevel,
              type: item.type,
              duration: item.duration,
              featured: item.featured,
              details: item.details,
              status: item.status,
              date_created: item.date_created,
              updated_at: item.updated_at,
              categoryname: item.categoryname,
              categorydescription: item.categorydescription,
              owner: item.owner,
              categoryId: item.categoryid,
              ownerFirstName: item.ownerFirstName,
              ownerLastName: item.ownerLastName,
              country: item.country,
              city: item.city,
              address: item.address,
              longitude: item.longitude,
              latitude: item.latitude,
              showAttachment: item.showattachment,
              jobSkills: item.jobSkills,
            });
          });

          return jobs;
        })
      );
  }
  getJobById(id: any): Observable<JobDetail> {
    let job: JobDetail;
    return this.http
      .get<JobDetail>(`${this.baseUrl}/api/v1/job/${id}`)
      .pipe(catchError(this.handleHttpError))
      .pipe(map((response) => (job = response['data'])));
  }
  verifyOtp(params: { email: string; otp: string }): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/api/v1/auth/confirm-otp`, params)
      .pipe(catchError(this.handleHttpError));
  }
  submitProposal(params: Proposal): Observable<any> {
    let headers = new HttpHeaders({
      authorization: this.getToken(),
    });
    let options = { headers: headers };
    return this.http
      .post(
        `${this.baseUrl}/api/v1/propose/${params.jobid}/propose`,
        params,
        options
      )
      .pipe(catchError(this.handleHttpError));
  }
  acceptProposal(job: JobDetail, proposal: Proposal): Observable<any> {
    let headers = new HttpHeaders({
      authorization: this.getToken(),
    });
    let options = { headers: headers };
    return this.http
      .post(
        `${this.baseUrl}/api/v1/propose/${job.id}/proposal/accept`,
        { id: proposal.id },
        options
      )
      .pipe(catchError(this.handleHttpError));
  }
  getUserProfile(): Observable<UserCompleteDetails> {
    let headers = new HttpHeaders({
      authorization: this.getToken(),
    });
    let options = { headers: headers };
    return this.http
      .get<UserCompleteDetails>(`${this.baseUrl}/api/v1/user/profile`, options)
      .pipe(map((response) => response['data']))
      .pipe(catchError(this.handleHttpError));
  }
  geocodeAddress(address: Address): Observable<Address> {
    return this.http
      .get<Address>(
        `https://maps.googleapis.com/maps/api/geocode/json?key=${this.apiKey}&place_id=${address.place_id}`
      )
      .pipe(catchError(this.handleHttpError))
      .pipe(map((data) => data['results']))
      .pipe(map((data) => data[0]));
  }
  getUserJobandProposals(): Observable<JobDetail[] | JobDetail> {
    let headers = new HttpHeaders({
      authorization: this.getToken(),
    });
    let options = { headers: headers };
    return this.http
      .get<JobDetail[]>(`${this.baseUrl}/api/v1/job/user/proposals`, options)
      .pipe(map((response) => response['data']))
      .pipe(
        map((response) => {
          const jobs: JobDetail[] = [];
          response.forEach((item) => {
            console.log(item);
            jobs.push({
              id: item.id,
              title: item.title,
              serviceLevel: item.serviceLevel,
              type: item.type,
              duration: item.duration,
              featured: item.featured,
              details: item.details,
              status: item.status,
              date_created: item.date_created,
              updated_at: item.updated_at,
              categoryname: item.categoryname,
              categorydescription: item.categorydescription,
              owner: item.owner,
              categoryId: item.categoryid,
              ownerFirstName: item.ownerFirstName,
              ownerLastName: item.ownerLastName,
              country: item.country,
              city: item.city,
              longitude: item.longitude,
              latitude: item.latitude,
              address: item.address,
              showAttachment: item.showattachment,
              jobSkills: item.jobSkills,
              proposals: item.proposals,
            });
          });

          return jobs;
        })
      )
      .pipe(catchError(this.handleHttpError));
  }
  updatedPersonalInfo(params: UserPersonalDetails): Observable<any> {
    let headers = new HttpHeaders({
      authorization: this.getToken(),
    });
    let options = { headers: headers };
    return this.http
      .patch(`${this.baseUrl}/api/v1/user/edit/details`, params, options)
      .pipe(catchError(this.handleHttpError));
  }
  updateUserSkills(params: UserSkills[]) {
    let headers = new HttpHeaders({
      authorization: this.getToken(),
    });
    let options = { headers: headers };
    return this.http
      .patch(`${this.baseUrl}/api/v1/user/edit/skills`, params, options)
      .pipe(catchError(this.handleHttpError));
  }
  updateUserExperience(params: UserExperience[]) {
    let headers = new HttpHeaders({
      authorization: this.getToken(),
    });
    let options = { headers: headers };
    return this.http
      .patch(`${this.baseUrl}/api/v1/user/edit/experience`, params, options)
      .pipe(catchError(this.handleHttpError));
  }
  updateUserEducation(params: UserEducation[]) {
    let headers = new HttpHeaders({
      authorization: this.getToken(),
    });
    let options = { headers: headers };
    return this.http
      .patch(`${this.baseUrl}/api/v1/user/edit/education`, params, options)
      .pipe(catchError(this.handleHttpError));
  }
  getUserInfoById(userId: string): Observable<UserCompleteDetails> {
    return this.http
      .get<UserCompleteDetails>(
        `${this.baseUrl}/api/v1/user/get-user-info/${userId}`
      )
      .pipe(map((response) => response['data']))
      .pipe(catchError(this.handleHttpError));
  }
  handleHttpError(error: HttpErrorResponse) {
    if (error.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
      console.error(error.error);
    }

    // If you want to return a new response:
    //return of(new HttpResponse({body: [{name: "Default value..."}]}));

    // If you want to return the error on the upper level:
    //return throwError(error);

    // or just return nothing:
    return throwError(error);
  }
}
