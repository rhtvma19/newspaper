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

  ngOnInit() { }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.apiService.post('/Article', this.form.value)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.toastr.success('Registration successful');
          this.router.navigate(['../login'], { relativeTo: this.route });
        },
        (error: any) => {
          // this.toastr.error(error);
          console.log(error);
        });
  }




  getByID(id: number) {
    this.apiService.get('/Article/' + id)
      .subscribe(
        (data: any) => {
          this.articleData = data;
        },
        (error: any) => {
          // this.toastr.error(error);
          console.log(error);
        });
  }

}
