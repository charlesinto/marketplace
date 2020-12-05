import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/shared/Category';
import { JQ_TOKEN } from '../../services/jquery.service';
import { FormGroup, FormControl } from '@angular/forms';
// import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Job } from '../../shared/Job';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.scss'],
})
export class PostJobComponent implements OnInit {
  categories: Category[] = [];

  jobForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    serviceLevel: new FormControl(''),
    type: new FormControl(''),
    duration: new FormControl(''),
    featured: new FormControl(''),
    details: new FormControl(''),
    status: new FormControl(''),
    categoryId: new FormControl(''),
  });
  showAttachment: boolean = false;
  skills: { name: string; value: string }[] = [
    { name: 'PHP', value: 'PHP' },
    { name: 'Website Design', value: 'Website Design' },
    { name: 'HTML 5', value: 'HTML 5' },
    { name: 'Graphic Design', value: 'Graphic Design' },
    { name: 'SEO', value: 'SEO' },
    { name: 'Bootstrap', value: 'Bootstrap' },
  ];
  selectedSkill: string = '';
  userSkills: string[] = [];
  constructor(
    private route: ActivatedRoute,
    @Inject(JQ_TOKEN) private $: any,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.categories = this.route.snapshot.data['categories'];
    this.utilService.isLoading();
    this.utilService.getCategories().subscribe(
      (data) => {
        this.utilService.stopLoading();
        this.categories = data;
      },
      (error) => {
        this.utilService.stopLoading();
        console.log(error);
      }
    );
    // console.log(this.$);
    // this.$('.chosen-select.Skills').select2();
  }
  onAddSkillSelect() {
    if (!this.userSkills.includes(this.selectedSkill)) {
      this.userSkills.push(this.selectedSkill);
    }
    // const selectedValue = this.jobForm.value[]
  }
  removeSkill(value: string) {
    const index = this.userSkills.findIndex((item) => item === value);
    this.userSkills.splice(index, 1);
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  toggleEditable(event) {
    this.showAttachment = event.target.checked ? true : false;
  }
  postJob() {
    try {
      if (this.jobForm.value['categoryId'] === '') return;
      const params: Job = this.jobForm.value;
      params.skills = this.userSkills;
      params.showAttachment = this.showAttachment ? 1 : 0;
      console.log(params);
      this.utilService.isLoading();

      this.utilService.createJob(params).subscribe(
        (data) => {
          this.utilService.stopLoading();
          alert('success');
          this.jobForm.reset();
          console.log(data);
        },
        (error) => {
          this.utilService.stopLoading();
          console.log(error);
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
}
