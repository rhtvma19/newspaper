import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { ApiService } from 'src/app/common/services/api.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  articleData: any = {};
  loading = false;
  submitted = false;
  id = 0;
  isAddMode = true;
  form = this.formBuilder.group({
    title: ['', Validators.required],
    subtitle: ['', Validators.required],
    shortsummery: ['', Validators.required],
    username: ['', Validators.required],
    body: ['', Validators.required],
    tagid: ['', [Validators.required]],
    userid: [''],
  });

  roles = [
    {
      id: '1',
      name: 'admin'
    },
    {
      id: '2',
      name: 'guest'
    },
    {
      id: '3',
      name: 'user'
    },
    {
      id: '4',
      name: 'journalist'
    }
  ];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private apiService: ApiService,
  ) {
    // redirect to home if already logged in
    // if (this.accountService.userValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    if (!this.isAddMode) {
      this.getByID(this.id);
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    if (this.isAddMode) {
      this.create();
    } else {
      this.edit();
    }
  }

  create() {
    this.loading = true;
    this.apiService.post('Article', this.form.value)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.toastr.success('Article Created successful');
          this.router.navigate(['../article-list'], { relativeTo: this.route });
        },
        (error: any) => {
          this.loading = false;
          // this.toastr.error(error);
          console.log(error);
        });
  }

  edit() {
    this.loading = true;
    this.apiService.put('Article', this.form.value, this.id)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.toastr.success('Article update successful');
          this.router.navigate(['../article-list'], { relativeTo: this.route });
        },
        (error: any) => {
          this.loading = false;
          // this.toastr.error(error);
          console.log(error);
        });
  }



  getByID(id: number) {
    this.apiService.get('Article/' + id)
      .subscribe(
        (data: any) => {
          this.articleData = data;
          this.form.patchValue(data);
        },
        (error: any) => {
          // this.toastr.error(error);
          console.log(error);
        });
  }

}
