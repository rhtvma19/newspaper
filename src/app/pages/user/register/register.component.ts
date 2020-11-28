import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { ApiService } from 'src/app/common/services/api.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userData = {};
  loading = false;
  submitted = false;
  form = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    username: ['', Validators.required],
    role: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  countries = [
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
    this.apiService.post('/User', this.form.value)
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
    this.apiService.get('/User/' + id)
      .subscribe(
        (data: any) => {
          this.toastr.success('User fetch successfull');
          this.userData = data;
        },
        (error: any) => {
          // this.toastr.error(error);
          console.log(error);
        });
  }
}
