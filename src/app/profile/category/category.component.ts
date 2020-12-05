import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilService } from 'src/app/services/util.service';
import { Category } from 'src/app/shared/Category';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });
  categories: Category[] = [];
  constructor(
    private utilService: UtilService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.getCateories();
    this.categories = this.route.snapshot.data['categories'];
  }
  getCateories() {
    this.utilService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }
  createCategory() {
    try {
      if (this.form.invalid) return alert('Please fill all information');
      this.utilService.isLoading();
      const params: Category = this.form.value;
      this.utilService.addCategory(params).subscribe(
        (data) => {
          this.getCateories();
          this.form.reset();
          this.utilService.stopLoading();
        },
        (error) => {
          this.utilService.stopLoading();
          alert('some errors encountered');
          console.error(error);
        }
      );
    } catch (error) {}
  }
}
