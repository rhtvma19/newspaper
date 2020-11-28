import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/common/services/api.service';
import { DataService } from 'src/app/common/services/data.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  loading = false;
  submitted = false;
  returnUrl = '';

  tagForm = this.formBuilder.group({
    name: ['', Validators.required]
  });
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService,
    public dataService: DataService
  ) {
    // redirect to home if already logged in
    // if (this.accountService.userValue) {
    //     this.router.navigate(['/']);
    // }
  }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.tagForm.controls; }


  onSubmit(): void {
    if (this.tagForm.status === 'VALID') {
      console.log(this.tagForm.value);
    }

    const data = this.tagForm.value;

    this.apiService.post('Tag', data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.toastr.success('User Login Successful');
          localStorage.setItem('token', response.token);

          this.dataService.setProfileObs(true);

          this.router.navigate(['/home']);
        },
        error => {
          this.toastr.error(error.error.message);
          console.log(error);
        });
  }

}
